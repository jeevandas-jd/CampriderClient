import { getAllLocations } from "../api/locations/locationAxios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/NavBar";

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

  if (loading) return <div>Loading locations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <h1>Available Locations</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {locations.map((location) => (
          <div
            key={location._id}
            onClick={() => handleSelect(location._id)}
            style={{
              cursor: "pointer",
              border: selectedLocation === location._id ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              minWidth: "200px",
              backgroundColor: selectedLocation === location._id ? "#e0f0ff" : "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease-in-out"
            }}
          >
            <h3>{location.department}</h3>
            <p>{location.description || "No description available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
