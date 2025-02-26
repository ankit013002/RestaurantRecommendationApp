from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import time
import logging

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
GOOGLE_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

# Sample route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Restaurant Recommendation API!"})

# Endpoint to search for restaurants
@app.route("/search", methods=["GET"])
def search_restaurants():
    query = request.args.get("query")  # Dish or cuisine
    location = request.args.get("location")  # User's location
    sort_by = request.args.get("sort_by", "quality")  # Default sort by quality
    page_token = request.args.get("page_token")  # Optional page token for pagination

    if not query or not location:
        return jsonify({"error": "Query and location are required"}), 400

    params = {
        "query": f"{query} restaurants in {location}",
        "key": GOOGLE_API_KEY
    }
    
    if page_token:
        params["pagetoken"] = page_token  # Add page token if provided
    
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

    return jsonify({
        "restaurants": formatted_restaurants,
        "next_page_token": data.get("next_page_token")  # Return next_page_token for pagination
    })

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
