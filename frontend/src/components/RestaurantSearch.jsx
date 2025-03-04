import { useState } from "react";
import axios from "axios";
import React from 'react'
import './RestaurantSearch.css'

function RestaurantSearch() {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

    const fetchRestaurants = async () => {
        if (!query || !location) return alert("Please enter a dish and location");

        setLoading(true);
        try {
        const response = await axios.get(`http://127.0.0.1:5000/search`, {
            params: { query, location },
        });
        setRestaurants(response.data.restaurants);
        } catch (error) {
        console.error("Error fetching restaurants:", error);
        }
        setLoading(false);
    };

  return (
    <div className='restaurant-search-container'>
        <div className="search-box">
            <input
            type="text"
            placeholder="Enter food (e.g., pizza, sushi)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <input
            type="text"
            placeholder="Enter location (e.g., New York, Los Angeles)..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={fetchRestaurants} disabled={loading}>
            {loading ? "Searching..." : "Find Restaurants"}
            </button>
        </div>
        {restaurants.length > 0 && (
            <div className="results">
            <h2>Results:</h2>
            <ul>
                {restaurants.map((r) => (
                <li key={r.place_id}>
                    <h3>{r.name}</h3>
                    <p>{r.address}</p>
                    <p>⭐ {r.rating} ({r.user_ratings_total} reviews)</p>
                    {r.photo_reference ? (
                    <>
                        {console.log(`Image URL: https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${r.photo_reference}&key=YOUR_GOOGLE_API_KEY`)}
                        <img
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${r.photo_reference}&key=${GOOGLE_API_KEY}`}
                        alt={r.name}
                        width="100"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.jpg"; // Fallback if API image fails
                        }}
                        />
                    </>
                    ) : (
                    <img src="/placeholder.jpg" alt="No Image Available" width="100" />
                    )}
                </li>
                ))}
            </ul>
            </div>
        )}
      </div>
  )
}

export default RestaurantSearch