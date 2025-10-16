import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/NavBar";
import { Bike, Car, Clock, Star, MapPin, User, Phone, Mail, BookOpen } from "lucide-react";
import "./style/ConsumerDashboard.css";

const ConsumerDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="consumer-loading">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="consumer-error">
                <div className="error-icon">⚠️</div>
                <h2>User Not Found</h2>
                <p>Please login to access your dashboard</p>
            </div>
        );
    }

    return (
        <div className="consumer-dashboard">
            <Navbar />
            
            <div className="consumer-content">
                {/* Header Section */}
                <header className="consumer-header">
                    <div className="consumer-welcome">
                        <div className="consumer-avatar">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="consumer-info">
                            <h1 className="consumer-title">Welcome back, {user.name}!</h1>
                            <p className="consumer-subtitle">Ready for your next ride?</p>
                        </div>
                    </div>
                    <div className="consumer-badge">
                        <User size={20} />
                        <span>Consumer</span>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className="consumer-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Bike size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>Bike Rides</h3>
                            <p>Fast & Affordable</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Car size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>Auto Rides</h3>
                            <p>Comfort & Space</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Clock size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>Avg. Wait</h3>
                            <p>5-10 mins</p>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="profile-card">
                    <h2 className="profile-section-title">Personal Information</h2>
                    <div className="profile-grid">
                        <div className="profile-item">
                            <div className="profile-icon">
                                <User size={20} />
                            </div>
                            <div className="profile-details">
                                <label className="profile-label">Full Name</label>
                                <p className="profile-value">{user.name}</p>
                            </div>
                        </div>
                        
                        <div className="profile-item">
                            <div className="profile-icon">
                                <Mail size={20} />
                            </div>
                            <div className="profile-details">
                                <label className="profile-label">Email Address</label>
                                <p className="profile-value">{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="profile-item">
                            <div className="profile-icon">
                                <MapPin size={20} />
                            </div>
                            <div className="profile-details">
                                <label className="profile-label">Department</label>
                                <p className="profile-value">{user.department}</p>
                            </div>
                        </div>
                        
                        <div className="profile-item">
                            <div className="profile-icon">
                                <BookOpen size={20} />
                            </div>
                            <div className="profile-details">
                                <label className="profile-label">Student ID</label>
                                <p className="profile-value">{user.studentID || "Not provided"}</p>
                            </div>
                        </div>
                        
                        <div className="profile-item">
                            <div className="profile-icon">
                                <User size={20} />
                            </div>
                            <div className="profile-details">
                                <label className="profile-label">Gender</label>
                                <p className="profile-value">{user.gender || "Not specified"}</p>
                            </div>
                        </div>
                        
                        <div className="profile-item">
                            <div className="profile-icon">
                                <Phone size={20} />
                            </div>
                            <div className="profile-details">
                                <label className="profile-label">Contact Number</label>
                                <p className="profile-value">{user.contactNo || "Not provided"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2 className="actions-title">Quick Actions</h2>
                    <div className="action-buttons">
                        <button className="action-btn primary">
                            <span className="btn-icon">🚗</span>
                            <span>Book a Ride</span>
                        </button>
                        <button className="action-btn secondary">
                            <span className="btn-icon">📝</span>
                            <span>Edit Profile</span>
                        </button>
                        <button className="action-btn secondary">
                            <span className="btn-icon">🕒</span>
                            <span>Ride History</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                    <h2 className="activity-title">Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">🚲</div>
                            <div className="activity-details">
                                <p className="activity-text">Bike ride to Library</p>
                                <p className="activity-time">Today, 2:30 PM</p>
                            </div>
                            <div className="activity-amount">₹65</div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">🚗</div>
                            <div className="activity-details">
                                <p className="activity-text">Auto ride to Hostel</p>
                                <p className="activity-time">Yesterday, 6:15 PM</p>
                            </div>
                            <div className="activity-amount">₹120</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsumerDashboard;