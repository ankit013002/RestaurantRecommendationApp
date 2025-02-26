from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Sample route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Restaurant Recommendation API!"})

# Endpoint to search for restaurants
@app.route("/search", methods=["GET"])
def search_restaurants():
    query = request.args.get("query")  # The food/cuisine user is searching for
    location = request.args.get("location")  # User's location

    if not query or not location:
        return jsonify({"error": "Query and location are required"}), 400

    # Call Google Places API or Yelp API
    google_api_key = os.getenv("GOOGLE_PLACES_API_KEY")
    google_places_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": f"{query} restaurants in {location}",
        "key": google_api_key
    }
    response = requests.get(google_places_url, params=params)
    data = response.json()

    return jsonify(data)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
