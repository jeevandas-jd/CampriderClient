import React, { useState, useEffect } from "react";
import { addLocation, getAllLocations } from "../../api/admin/adminClient";
import { MapPin, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import "./style/AddLocations.css";

const AddLocations = () => {
    const [locations, setLocations] = useState([]);
    const [locationData, setLocationData] = useState({ department: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLocationData({
            ...locationData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);
        
        try {
            await addLocation(locationData);
            setMessage("Location added successfully!");
            setLocationData({ department: "" });
            
            // Refresh list after adding
            const response = await getAllLocations();
            setLocations(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add location. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getAllLocations();
                setLocations(response.data);
            } catch (err) {
                console.error("Failed to fetch locations", err);
                setError("Failed to load existing locations.");
            }
        };
        fetchLocations();
    }, []);

    return (
        <div className="add-locations-container">
            {/* Add Location Form */}
            <div className="location-form-card">
                <div className="form-header">
                    <MapPin size={24} />
                    <h3>Add New Location</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="location-form">
                    <div className="form-group">
                        <label htmlFor="department" className="form-label">
                            Location Name
                        </label>
                        <input
                            id="department"
                            type="text"
                            name="department"
                            value={locationData.department}
                            onChange={handleChange}
                            placeholder="Enter location name (e.g., Computer Science Department)"
                            className="form-input"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading || !locationData.department.trim()}
                    >
                        {loading ? (
                            <div className="loading-spinner-small"></div>
                        ) : (
                            <>
                                <Plus size={18} />
                                Add Location
                            </>
                        )}
                    </button>
                </form>

                {/* Messages */}
                {message && (
                    <div className="message success">
                        <CheckCircle size={16} />
                        <span>{message}</span>
                    </div>
                )}
                {error && (
                    <div className="message error">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {/* Existing Locations */}
            {locations.length > 0 && (
                <div className="locations-list-card">
                    <div className="list-header">
                        <h3>Existing Locations</h3>
                        <span className="location-count">{locations.length} locations</span>
                    </div>
                    
                    <div className="locations-grid">
                        {locations.map((loc, index) => (
                            <div key={loc._id} className="location-item">
                                <div className="location-icon">
                                    <MapPin size={16} />
                                </div>
                                <span className="location-name">{loc.department}</span>
                                <div className="location-number">{index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {locations.length === 0 && !error && (
                <div className="empty-state">
                    <MapPin size={48} className="empty-icon" />
                    <h4>No Locations Added Yet</h4>
                    <p>Start by adding your first location using the form above.</p>
                </div>
            )}
        </div>
    );
};

export default AddLocations;