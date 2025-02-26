from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import time
import logging
import redis
from dotenv import load_dotenv
import json

load_dotenv()

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app) 

REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_DB = 0
CACHE_EXPIRY = 300  

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)

GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
GOOGLE_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Restaurant Recommendation API!"})

@app.route("/search", methods=["GET"])
def search_restaurants():
    query = request.args.get("query")
    location = request.args.get("location")
    sort_by = request.args.get("sort_by", "quality")
    page_token = request.args.get("page_token")

    if not query or not location:
        return jsonify({"error": "Query and location are required"}), 400

    cache_key = f"{query}_{location}_{sort_by}_{page_token}"
    
    cached_data = redis_client.get(cache_key)
    if cached_data:
        logging.info("Cache hit - Returning cached data")
        return jsonify(json.loads(cached_data))

    params = {
        "query": f"{query} restaurants in {location}",
        "key": GOOGLE_API_KEY
    }
    
    if page_token:
        params["pagetoken"] = page_token

    for _ in range(3):
        response = requests.get(GOOGLE_PLACES_API_URL, params=params)
        data = response.json()
        if "results" in data:
            break
        logging.warning(f"Retrying Google API request... (Attempt {_+1})")
        time.sleep(2)
        
    if "results" not in data:
        return jsonify({"error": "No results found"}), 404

    restaurants = data["results"]

    formatted_restaurants = []
    for r in restaurants:
        formatted_restaurants.append({
            "name": r.get("name"),
            "address": r.get("formatted_address", "Address not available"),
            "rating": r.get("rating", 0),
            "price_level": r.get("price_level", "N/A"),
            "user_ratings_total": r.get("user_ratings_total", 0),
            "icon": r.get("icon"),
            "photo_reference": r["photos"][0]["photo_reference"] if "photos" in r else None,
            "place_id": r.get("place_id")
        })
        
    if sort_by == "quality":
        formatted_restaurants.sort(key=lambda x: (x["rating"], x["user_ratings_total"]), reverse=True)
    elif sort_by == "value":
        formatted_restaurants.sort(key=lambda x: (x["price_level"] if isinstance(x["price_level"], int) else float("inf")))

    response_data = {
        "restaurants": formatted_restaurants,
        "next_page_token": data.get("next_page_token")
    }

    try:
        redis_client.setex(cache_key, CACHE_EXPIRY, json.dumps(response_data))
    except redis.exceptions.ConnectionError:
        logging.error("Redis is unavailable, continuing without caching.")


    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True)
