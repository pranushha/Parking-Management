import React, { useState } from 'react';
import './SearchFilter.css';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockParkingSpots = [
  {
    id: 1,
    name: "Amanora Mall",
    location: "Hadapsar",
    distance: 5,
    price: 20,
    rating: 4.5,
    availableSpots: 12,
    amenities: ["CCTV", "Covered", "Security"],
    hours: "24/7",
    image: "Amanoramall.png"
  },
  {
    id: 2,
    name: "Central Mall",
    location: "Shivaji Nagar",
    distance: 3,
    price: 15,
    rating: 4.2,
    availableSpots: 8,
    amenities: ["CCTV", "EV Charging"],
    hours: "8:00 AM - 12:00 AM",
    image: "Centralmall.png"
  },
  {
    id: 3,
    name: "Metro Station",
    location: "District Court",
    distance: 6,
    price: 12,
    rating: 4.7,
    availableSpots: 5,
    amenities: ["CCTV", "Covered", "Valet", "EV Charging"],
    hours: "24/7",
    image: "Districtcourt.png"
  },
  {
    id: 4,
    name: "Phoenix Marketcity",
    location: "Viman Nagar",
    distance: 11,
    price: 25,
    rating: 3.9,
    availableSpots: 20,
    amenities: ["Security"],
    hours: "6:00 AM - 10:00 PM",
    image: "Phoenix.png"
  },
  {
    id: 5,
    name: "Millennium Mall",
    location: "Wakad",
    distance: 14,
    price: 2.00,
    rating: 3.0,
    availableSpots: 36,
    amenities: ["CCTV", "Security"],
    hours: "5:00 AM - 1:00 AM",
    image: "millenium.png"
  },
  {
    id: 6,
    name: "City Pride",
    location: "Satara Road",
    distance: 7,
    price: 3.25,
    rating: 4.3,
    availableSpots: 15,
    amenities: ["CCTV", "Covered", "EV Charging"],
    hours: "9:00 AM - 9:00 PM",
    image: "Citypride.png"
  }
];

function SearchFilter() {
  const navigate = useNavigate(); // ✅ Added navigation hook

  // Search state
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // Filter states
  const [sortBy, setSortBy] = useState('distance');
  const [maxDistance, setMaxDistance] = useState(10);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // UI states
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(mockParkingSpots);

  // ✅ Function to navigate to Dashboard
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  
  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();

    let filteredResults = mockParkingSpots.filter(spot => {
      if (spot.distance > maxDistance) return false;
      if (spot.price > maxPrice) return false;
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          spot.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    });

    if (sortBy === 'distance') {
      filteredResults.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'price_low') {
      filteredResults.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filteredResults.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filteredResults.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'availability') {
      filteredResults.sort((a, b) => b.availableSpots - a.availableSpots);
    }

    setSearchResults(filteredResults);
  };
  
  const resetFilters = () => {
    setSortBy('distance');
    setMaxDistance(20);
    setMaxPrice(100);
    setSelectedAmenities([]);
  };
  
  return (
    <div className="search-page">
      <header className="search-header">
        <div className="logo">
          <h1>SmartPark</h1>
        </div>
        <nav className="navbar">
          <button className="nav-btn" onClick={handleDashboardClick}>Dashboard</button> {/* ✅ Edited */}
          <button className="nav-btn active">Find Parking</button>
        </nav>
      </header>

      <div className="search-container">
        <div className="search-section">
          <h2>Find Available Parking Spots</h2>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-inputs">
              <div className="input-group">
                <label>Location</label>
                <input 
                  type="text" 
                  placeholder="Enter address, city, or landmark" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Time</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <button type="submit" className="search-btn">Search</button>
            </div>

            <div className="filter-controls">
              <button 
                type="button" 
                className="filter-toggle" 
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'} 
                <span className="filter-icon">{showFilters ? '▲' : '▼'}</span>
              </button>
            </div>

            {showFilters && (
              <div className="filter-section">
                <div className="filter-grid">
                  {/* Sort By */}
                  <div className="filter-group">
                    <h3>Sort By</h3>
                    <div className="sort-options">
                      {/* Options like Nearest, Price, etc. */}
                      {['distance', 'price_low', 'price_high', 'rating', 'availability'].map(option => (
                        <label key={option} className={sortBy === option ? 'active' : ''}>
                          <input
                            type="radio"
                            name="sortBy"
                            value={option}
                            checked={sortBy === option}
                            onChange={() => setSortBy(option)}
                          />
                          {option === 'distance' && 'Nearest'}
                          {option === 'price_low' && 'Price (Low to High)'}
                          {option === 'price_high' && 'Price (High to Low)'}
                          {option === 'rating' && 'Rating'}
                          {option === 'availability' && 'Availability'}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Distance Filter */}
                  <div className="filter-group">
                    <h3>Distance (max {maxDistance} km)</h3>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="20" 
                      step="0.5" 
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                      className="slider"
                    />
                    <div className="range-labels">
                      <span>0.5 km</span>
                      <span>20 km</span>
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="filter-group">
                    <h3>Price (max ₹{maxPrice.toFixed(2)}/hr)</h3>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      step="0.5" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                      className="slider"
                    />
                    <div className="range-labels">
                      <span>₹10.00</span>
                      <span>₹100.00</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="filter-group">
                    <h3>Amenities</h3>
                    <div className="amenities-options">
                      {['CCTV', 'Covered', 'Valet', 'EV Charging', 'Security'].map((amenity) => (
                        <label key={amenity} className={selectedAmenities.includes(amenity) ? 'active' : ''}>
                          <input 
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                          />
                          {amenity}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="filter-actions">
                  <button type="button" className="reset-btn" onClick={resetFilters}>
                    Reset Filters
                  </button>
                  <button type="submit" className="apply-btn">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="results-section">
          <div className="results-header">
            <h3>Available Parking Spots</h3>
            <p>{searchResults.length} locations found</p>
          </div>

          <div className="results-grid">
            {searchResults.map(spot => (
              <div className="parking-card" key={spot.id}>
                <div className="parking-image">
                  <img src={spot.image} alt={spot.name} />
                  <div className="spots-available">
                    {spot.availableSpots} spots left
                  </div>
                </div>
                <div className="parking-info">
                  <h4>{spot.name}</h4>
                  <p className="location">{spot.location}</p>
                  <div className="details-row">
                    <span className="distance">{spot.distance} km away</span>
                    <span className="rating">★ {spot.rating}</span>
                  </div>
                  <div className="amenities-row">
                    {spot.amenities.map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <div className="booking-row">
                    <div className="price">₹{spot.price.toFixed(2)}/hour</div>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="no-results">
              <h3>No parking spots match your criteria</h3>
              <p>Try adjusting your filters or search for a different location</p>
              <button className="reset-btn" onClick={resetFilters}>Reset All Filters</button>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="load-more">
              <button className="load-more-btn">Load More Results</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
