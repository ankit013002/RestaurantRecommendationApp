import Header from "../components/Header";
import RestaurantSearch from "../components/RestaurantSearch";
import Navbar from "../components/Navbar";
import "../css/Home.css";

function Home() {
  return (
    <div>
        <Navbar />
        <div className="home-container">
            <Header />
            <RestaurantSearch/>
        </div>
        <div>
        </div>
    </div>
  );
}

export default Home;