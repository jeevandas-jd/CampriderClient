import React, { useState } from "react";
import { completePilotProfile } from "../../api/pilot/pilotClient";
import { User, Building, Car, Hash, IdCard, CheckCircle, AlertCircle } from "lucide-react";
import "./style/FillInfo.css";

const FillInfo = () => {
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        vehicleType: "",
        vehicleNumber: "",
        gender: "",
        studentID: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

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

        const token = localStorage.getItem("token");
        if (!token) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        try {
            await completePilotProfile(formData);
            setSuccess("Profile updated successfully! You can now access the pilot dashboard.");
            setFormData({
                name: "",
                department: "",
                vehicleType: "",
                vehicleNumber: "",
                gender: "",
                studentID: ""
            });
        } catch (err) {
            setError(err.response?.data?.message || "Profile update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            formData.name.trim() &&
            formData.department.trim() &&
            formData.vehicleType.trim() &&
            formData.vehicleNumber.trim() &&
            formData.gender.trim() &&
            formData.studentID.trim()
        );
    };

    return (
        <div className="fill-info-container">
            <div className="fill-info-card">
                <div className="form-header">
                    <div className="header-icon">
                        <User size={32} />
                    </div>
                    <div className="header-content">
                        <h1>Complete Your Pilot Profile</h1>
                        <p>Please provide the required information to start accepting rides</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="pilot-form">
                    {/* Messages */}
                    {error && (
                        <div className="message error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="message success">
                            <CheckCircle size={18} />
                            <span>{success}</span>
                        </div>
                    )}

                    <div className="form-grid">
                        {/* Name Field */}
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                <User size={16} />
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Department Field */}
                        <div className="form-group">
                            <label htmlFor="department" className="form-label">
                                <Building size={16} />
                                Department
                            </label>
                            <input
                                id="department"
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Enter your department"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Student ID Field */}
                        <div className="form-group">
                            <label htmlFor="studentID" className="form-label">
                                <IdCard size={16} />
                                Student ID
                            </label>
                            <input
                                id="studentID"
                                type="text"
                                name="studentID"
                                value={formData.studentID}
                                onChange={handleChange}
                                placeholder="Enter your student ID"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Gender Field */}
                        <div className="form-group">
                            <label htmlFor="gender" className="form-label">
                                <span className="gender-icon">👤</span>
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Vehicle Type Field */}
                        <div className="form-group">
                            <label htmlFor="vehicleType" className="form-label">
                                <Car size={16} />
                                Vehicle Type
                            </label>
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="bike">Bike</option>
                                <option value="scooter">Scooter</option>
                                <option value="motorcycle">Motorcycle</option>
                                <option value="electric-bike">Electric Bike</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Vehicle Number Field */}
                        <div className="form-group">
                            <label htmlFor="vehicleNumber" className="form-label">
                                <Hash size={16} />
                                Vehicle Number
                            </label>
                            <input
                                id="vehicleNumber"
                                type="text"
                                name="vehicleNumber"
                                value={formData.vehicleNumber}
                                onChange={handleChange}
                                placeholder="Enter your vehicle registration number"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading || !isFormValid()}
                    >
                        {loading ? (
                            <div className="loading-spinner-small"></div>
                        ) : (
                            <>
                                <CheckCircle size={18} />
                                Complete Profile
                            </>
                        )}
                    </button>
                </form>

                <div className="form-footer">
                    <p className="footer-text">
                        By completing this form, you agree to our terms of service and privacy policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FillInfo;