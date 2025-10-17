import React, { useState } from "react";
import { fillInfo } from "../../api/consumer/consumerClient";
import { User, Building, IdCard, Phone, CheckCircle, AlertCircle } from "lucide-react";
import "./style/ConsumerFillInfo.css";

const ConsumerFillInfo = () => {
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        studentID: "",
        gender: "",
        contactNo: ""
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
            await fillInfo(formData);
            setSuccess("Profile updated successfully! You can now use the consumer dashboard.");
            setFormData({
                name: "",
                department: "",
                studentID: "",
                gender: "",
                contactNo: ""
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
            formData.studentID.trim() &&
            formData.gender.trim() &&
            formData.contactNo.trim()
        );
    };

    return (
        <div className="consumer-fill-info-container">
            <div className="consumer-fill-info-card">
                <div className="form-header">
                    <div className="header-icon">
                        <User size={32} />
                    </div>
                    <div className="header-content">
                        <h1>Complete Your Consumer Profile</h1>
                        <p>Please provide the required information to continue using our services</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="consumer-form">
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
                        {/* Name */}
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
                                disabled={loading}
                            />
                        </div>

                        {/* Department */}
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
                                disabled={loading}
                            />
                        </div>

                        {/* Student ID */}
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
                                disabled={loading}
                            />
                        </div>

                        {/* Gender */}
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
                                disabled={loading}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Contact Number */}
                        <div className="form-group">
                            <label htmlFor="contactNo" className="form-label">
                                <Phone size={16} />
                                Contact Number
                            </label>
                            <input
                                id="contactNo"
                                type="tel"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                placeholder="Enter your contact number"
                                className="form-input"
                                required
                                disabled={loading}
                                pattern="[0-9]{10}"
                                title="Please enter a valid 10-digit phone number"
                            />
                            <small className="input-hint">10-digit phone number</small>
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

export default ConsumerFillInfo;