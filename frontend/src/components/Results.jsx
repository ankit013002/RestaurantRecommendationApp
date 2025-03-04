import { useLocation, useNavigate } from "react-router-dom";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurants = location.state?.restaurants || [];

  return (
    <div className="results-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Back to Search
      </button>
      <h1>Search Results</h1>
      {restaurants.length > 0 ? (
        <ul className="results-list">
          {restaurants.map((r) => (
            <li key={r.place_id} className="result-item">
              {/* Left: Restaurant Details */}
              <div className="result-details">
                <h3>{r.name}</h3>
                <p>{r.address}</p>
              </div>

              {/* Middle: Rating */}
              <div className="result-rating">
                ⭐ {r.rating} ({r.user_ratings_total} reviews)
              </div>

              {/* Right: Restaurant Image */}
              <img
                src={r.photo_reference 
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${r.photo_reference}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`
                  : "/placeholder.jpg"}
                alt={r.name}
                width="100"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Results;
