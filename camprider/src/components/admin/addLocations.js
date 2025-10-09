import { addLocation, getAllLocations } from "../../api/admin/adminClient";
import React, { useState, useEffect } from "react";

const AddLocations = () => {
    const [locations, setLocations] = useState([]);
    const [locationData, setLocationData] = useState({ department: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
        try {
            await addLocation(locationData);
            setMessage("Location added successfully");
            setLocationData({ department: "" });
            // Refresh list after adding
            const response = await getAllLocations();
            setLocations(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add location");
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getAllLocations();
                setLocations(response.data);
            } catch (err) {
                console.error("Failed to fetch locations", err);
            }
        };
        fetchLocations();
    }, []);

    return (
        <div>
            <h2>Add New Location</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="department"
                        value={locationData.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Location</button>
            </form>

            {locations.length > 0 && (
                <div>
                    <h3>Existing Locations:</h3>
                    <ul>
                        {locations.map((loc) => (
                            <li key={loc._id}>{loc.department}</li>
                        ))}
                    </ul>
                </div>
            )}
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default AddLocations;
