import React, { useState, useEffect } from "react";
import { requestTrip } from "../../api/consumer/consumerClient";
import { getAllLocations } from "../../api/locations/locationAxios";
import { X, MapPin, Navigation, DollarSign, Car, AlertCircle, CheckCircle } from "lucide-react";
import "./style/TripModal.css";
import TripConsole from "../../components/trip/tripConsole";
import { setTripInfo } from "../../middlewares/consumer/tripInfo";
const TripModal = ({ onClose }) => {
  const FIXED_FARE = 10; // fixed fare among locations

  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: ""
  });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [response, setResponse] = useState(null);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.pickupLocation || !formData.dropoffLocation) {
      setError("Please select both pickup and drop-off locations");
      setLoading(false);
      return;
    }

    if (formData.pickupLocation === formData.dropoffLocation) {
      setError("Pickup and drop-off locations cannot be the same");
      setLoading(false);
      return;
    }

    try {
      const data = await requestTrip({ 
        pickupLocation: formData.pickupLocation, 
        dropLocation: formData.dropoffLocation, 
        fare: FIXED_FARE 
      });
      setTripInfo(data.data);
      console.log("Trip requested:", data.data);

      setSuccess("Trip requested successfully! Finding a pilot...");
      
      // Reset form and close modal after success
      setTimeout(() => {
        setFormData({ pickupLocation: "", dropoffLocation: "" });
        onClose();
      }, 2000);

      
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.pickupLocation && formData.dropoffLocation && formData.pickupLocation !== formData.dropoffLocation;
  };
  if (response) {
    console.log("Rendering TripConsole with response:", response);
    return <TripConsole tripId={response.trip.__id} pickupLocation={response.trip.pickupLocation} dropLocation={response.trip.dropLocation} fare={response.trip.fare} />;
  }
  return (
    <div className="trip-modal-overlay" onClick={onClose}>
      <div className="trip-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-title">
            <Car size={24} />
            <h2>Request a Trip</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          {/* Messages */}
          {error && (
            <div className="message error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="message success">
              <CheckCircle size={16} />
              <span>{success}</span>
            </div>
          )}

          {/* Location Selection */}
          <div className="location-section">
            <div className="form-group">
              <label htmlFor="pickupLocation" className="form-label">
                <MapPin size={16} />
                Pickup Location
              </label>
              <select
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              >
                <option value="">Select pickup location</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc.department}>
                    {loc.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="location-arrow">↓</div>

            <div className="form-group">
              <label htmlFor="dropoffLocation" className="form-label">
                <Navigation size={16} />
                Drop-off Location
              </label>
              <select
                id="dropoffLocation"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              >
                <option value="">Select drop-off location</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc.department}>
                    {loc.department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fare Information */}
          <div className="fare-section">
            <div className="fare-icon">
              <DollarSign size={20} />
            </div>
            <div className="fare-content">
              <label>Trip Fare</label>
              <p className="fare-amount">₹{FIXED_FARE}</p>
              <p className="fare-description">Fixed fare for all locations</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button 
              type="submit" 
              className="action-btn primary-btn"
              disabled={loading || !isFormValid()}
            >
              {loading ? (
                <div className="loading-spinner-small"></div>
              ) : (
                <>
                  <Car size={18} />
                  Request Trip
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="action-btn secondary-btn"
              onClick={onClose}
              disabled={loading}
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