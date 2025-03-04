import React from 'react'
import './Header.css'
import RestaurantSearch from "./RestaurantSearch";

const Header = () => {
  return (
    <div className='header-container'>
        <img className='MainImage' src="./Homepage.png" />
        <div className='header-overlay'>
            <h1 className='header-title'>Discover Your Next Meal</h1>
            <p className='header-subtitle'>Find the best restaurants around you</p>
        </div>
        <div className='search-container'>
            <RestaurantSearch/>
        </div>
    </div>
  )
}

export default Header