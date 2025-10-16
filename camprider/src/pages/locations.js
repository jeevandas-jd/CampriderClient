import { getAllLocations } from "../api/locations/locationAxios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/NavBar";
import { MapPin, Navigation, Clock, Star } from "lucide-react";
import "./style/Locations.css";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocations();
        setLocations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSelect = (locationId) => {
    setSelectedLocation(locationId);
  };

  if (loading) return (
    <div className="locations-loading">
      <div className="loading-spinner"></div>
      <p>Loading locations...</p>
    </div>
  );
  
  if (error) return (
    <div className="locations-error">
      <div className="error-icon">⚠️</div>
      <h2>Error Loading Locations</h2>
      <p>{error}</p>
      <button className="locations-retry-btn" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="locations-container">
      <Navbar />
      
      <div className="locations-content">
        <header className="locations-header">
          <div className="locations-header-content">
            <MapPin className="locations-header-icon" size={32} />
            <h1 className="locations-title">Available Locations</h1>
            <p className="locations-subtitle">Choose your pickup and drop locations</p>
          </div>
        </header>

        <div className="locations-grid">
          {locations.map((location) => (
            <div
              key={location._id}
              onClick={() => handleSelect(location._id)}
              className={`location-card ${
                selectedLocation === location._id ? "location-card-selected" : ""
              }`}
            >
              <div className="location-card-header">
                <div className="location-icon">
                  <Navigation size={20} />
                </div>
                <h3 className="location-department">{location.department}</h3>
                {selectedLocation === location._id && (
                  <div className="location-selected-badge">Selected</div>
                )}
              </div>
              
              <p className="location-description">
                {location.description || "No description available"}
              </p>
              
              <div className="location-stats">
                <div className="location-stat">
                  <Clock size={16} />
                  <span>15-25 min</span>
                </div>
                <div className="location-stat">
                  <Star size={16} />
                  <span>4.8</span>
                </div>
              </div>
              
              <div className="location-actions">
                <button className="location-select-btn">
                  {selectedLocation === location._id ? "Selected" : "Select Location"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedLocation && (
          <div className="locations-selected-info">
            <div className="selected-location-card">
              <h3>Selected Location</h3>
              <p>
                {locations.find(loc => loc._id === selectedLocation)?.department}
              </p>
              <button 
                className="locations-confirm-btn"
                onClick={() => console.log("Proceeding with selected location:", selectedLocation)}
              >
                Confirm Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;