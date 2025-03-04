import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header-container'>
        <img className='MainImage' src="./Homepage.png" />
        <div className='header-overlay'>
            <h1 className='header-title'>Discover Your Next Meal</h1>
            <p className='header-subtitle'>Find the best restaurants around you</p>
        </div>
    </div>
  )
}

export default Header