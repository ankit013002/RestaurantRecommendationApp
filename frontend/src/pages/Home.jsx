import Header from "../components/Header";
import RestaurantSearch from "../components/RestaurantSearch";
import "../css/Home.css";

function Home() {
  return (
    <div className="home-container">
        <Header />
        <RestaurantSearch/>
    </div>
  );
}

export default Home;