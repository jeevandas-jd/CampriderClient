import React, { useState, useEffect } from "react";
import { requestTrip } from "../../api/consumer/consumerClient";
import { getAllLocations } from "../../api/locations/locationAxios";

const TripModal = ({ onClose }) => {
  const FIXED_FARE = 10; // fixed fare among locations

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passengerID, setPassengerID] = localStorage.getItem("userId");

  // Fetch all locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocations();
        setLocations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch locations");
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!pickupLocation || !dropoffLocation) {
      setError("Please select both pickup and drop-off locations");
      setLoading(false);
      return;
    }

    try {
      await requestTrip({ pickupLocation,dropLocation: dropoffLocation, fare: FIXED_FARE});
      setSuccess("Trip requested successfully!");
      setPickupLocation("");
      setDropoffLocation("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h2>Request a Trip</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Pickup Location:</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="" disabled>Select pickup location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc.department}>{loc.department}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Drop-off Location:</label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="" disabled>Select drop-off location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc.department}>{loc.department}</option>
              ))}
            </select>
          </div>

          <p>Fixed fare among locations: ${FIXED_FARE}</p>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Requesting..." : "Request Trip"}
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripModal;
