import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FillInfo from "../../components/pilot/FillInfo";
import Navbar from "../../components/navbar/NavBar";
import baseURL from "../../api/baseUrl";
import { io } from "socket.io-client";
import RequestModal from "../../modal/pilot/tripRequest";
import StatusToggle from "../../components/pilot/statusTogle";

import "./style/PilotDashboard.css";
import {getSocket} from "../../middlewares/socket";
const PilotDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [tripRequest, setTripRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const socket = getSocket();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user && user.FormSubmitted !== false) {

            console.log("socket ID:", socket);
            
            
            


            socket.on("tripRequest", (data) => {
                console.log("Received trip request:", data);
                setTripRequest(data);
                setShowModal(true);
            });



            return () => {
                //socket.disconnect();
            };
        }
    }, [user]);

    if (!user) {
        return (
            <div className="pilot-loading">
                <div className="loading-spinner"></div>
                <p>Loading Pilot Dashboard...</p>
            </div>
        );
    }

    if (user.FormSubmitted === false) {
        return <FillInfo />;
    }

    return (
        <div className="pilot-dashboard">
            <Navbar />
            
            <div className="pilot-content">
                {/* Header Section */}
                <header className="pilot-header">
                    <div className="pilot-welcome">
                        <h1 className="pilot-title">Welcome, {user.name}!
                        </h1>
                        <p className="pilot-subtitle">Ready to accept rides</p>
                    </div>
                    <div className="pilot-status-section">
                        <StatusToggle />
                        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
                            <div className="status-dot"></div>
                            <span>{isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                </header>

                {/* Stats Overview */}
                <div className="pilot-stats">
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-info">
                            <h3>{user.ratingAverage || "4.8"}</h3>
                            <p>Rating</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🚗</div>
                        <div className="stat-info">
                            <h3>{user.vehicleType || "Vehicle"}</h3>
                            <p>Vehicle Type</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🏢</div>
                        <div className="stat-info">
                            <h3>{user.department || "Campus"}</h3>
                            <p>Department</p>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="pilot-profile-card">
                    <h2 className="profile-section-title">Profile Information</h2>
                    <div className="profile-grid">
                        <div className="profile-item">
                            <label className="profile-label">Full Name</label>
                            <p className="profile-value">{user.name}</p>
                        </div>
                        <div className="profile-item">
                            <label className="profile-label">Email Address</label>
                            <p className="profile-value">{user.email}</p>
                        </div>
                        <div className="profile-item">
                            <label className="profile-label">Department</label>
                            <p className="profile-value">{user.department}</p>
                        </div>
                        <div className="profile-item">
                            <label className="profile-label">Vehicle Type</label>
                            <p className="profile-value">{user.vehicleType}</p>
                        </div>
                        <div className="profile-item">
                            <label className="profile-label">Vehicle Number</label>
                            <p className="profile-value">{user.vehicleNumber}</p>
                        </div>
                        <div className="profile-item">
                            <label className="profile-label">Average Rating</label>
                            <div className="rating-display">
                                <span className="rating-value">{user.ratingAverage || "4.8"}</span>
                                <span className="rating-stars">★★★★★</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="pilot-actions">
                    <h2 className="actions-title">Quick Actions</h2>
                    <div className="action-buttons">
                        <button className="action-btn primary">
                            <span className="btn-icon">📊</span>
                            <span>View Earnings</span>
                        </button>
                        <button className="action-btn secondary">
                            <span className="btn-icon">📝</span>
                            <span>Update Profile</span>
                        </button>
                        <button className="action-btn secondary">
                            <span className="btn-icon">🕒</span>
                            <span>Ride History</span>
                        </button>
                    </div>
                </div>

                {/* Trip Request Modal */}
                {showModal && tripRequest && (
                    <RequestModal 
                        tripId={tripRequest.tripId}
                        pickupLocation={tripRequest.pickupLocation}
                        dropLocation={tripRequest.dropLocation}
                        fare={tripRequest.fare}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default PilotDashboard;