import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/RestaurantSearch.css";

function RestaurantSearch() {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchRestaurants = async () => {
        if (!query || !location) return alert("Please enter a dish and location");

        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/search`, {
                params: { query, location },
            });
            setLoading(false);
            navigate("/results", { state: { restaurants: response.data.restaurants } });
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            setLoading(false);
        }
    };

    return (
        <div>
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
        </div>
    );
}

export default RestaurantSearch;
