import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StatusToggle from "../pilot/statusTogle";
import "./style/Navbar.css";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [isAdmin, setIsAdmin] = useState(role === "admin");
    const [isPilot, setIsPilot] = useState(role === "pilot");
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/');
    };

    const handleLocations = () => {
        navigate('/locations');
    };

    const handleDashboard = () => {
        if(role === "pilot"){
            navigate('/pilot/dashboard');
        }
        else if(role === "consumer"){
            navigate('/consumer/dashboard');
        }
        else if(role === "admin"){
            setIsAdmin(true);
            navigate('/profile');
        }
        else{
            navigate('/profile');
        }
    }

    return (
        <>
            {/* Top Bar for Desktop */}
            <nav className="navbar-top">
                <div className="navbar-brand" onClick={handleHome}>
                    <div className="navbar-logo">
                        <span className="navbar-logo-icon">🚲</span>
                    </div>
                    <span className="navbar-title">CampRider</span>
                </div>

                <div className="navbar-menu-desktop">
                    <button className="navbar-btn" onClick={handleHome}>
                        <span className="navbar-btn-icon">🏠</span>
                        <span>Home</span>
                    </button>
                    
                    <button className="navbar-btn" onClick={handleDashboard}>
                        <span className="navbar-btn-icon">👤</span>
                        <span>Profile</span>
                    </button>
                    
                    <button className="navbar-btn" onClick={handleLocations}>
                        <span className="navbar-btn-icon">📍</span>
                        <span>Locations</span>
                    </button>
                    
                    {isAdmin && (
                        <button className="navbar-btn navbar-admin" onClick={() => navigate('/admin/dashboard')}>
                            <span className="navbar-btn-icon">🛡️</span>
                            <span>Admin</span>
                        </button>
                    )}
                    
                    {isPilot && (
                        <button className="navbar-btn navbar-pilot" onClick={() => navigate('/pilot/dashboard')}>
                            <span className="navbar-btn-icon">🚗</span>
                            <span>Pilot</span>
                        </button>
                    )}
                </div>

                <div className="navbar-actions">
                    {isPilot && (
                        <div className="navbar-status-desktop">
                            <StatusToggle />
                        </div>
                    )}
                    <button className="navbar-btn navbar-logout" onClick={handleLogout}>
                        <span className="navbar-btn-icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            {/* Bottom Bar for Mobile */}
            <nav className="navbar-bottom">
                <button className="nav-bottom-btn" onClick={handleHome}>
                    <span className="nav-bottom-icon">🏠</span>
                    <span className="nav-bottom-text">Home</span>
                </button>
                
                <button className="nav-bottom-btn" onClick={handleDashboard}>
                    <span className="nav-bottom-icon">👤</span>
                    <span className="nav-bottom-text">Profile</span>
                </button>
                
                <button className="nav-bottom-btn" onClick={handleLocations}>
                    <span className="nav-bottom-icon">📍</span>
                    <span className="nav-bottom-text">Locations</span>
                </button>
                
                {isAdmin && (
                    <button className="nav-bottom-btn nav-bottom-admin" onClick={() => navigate('/admin/dashboard')}>
                        <span className="nav-bottom-icon">🛡️</span>
                        <span className="nav-bottom-text">Admin</span>
                    </button>
                )}
                
                {isPilot && (
                    <button className="nav-bottom-btn nav-bottom-pilot" onClick={() => navigate('/pilot/dashboard')}>
                        <span className="nav-bottom-icon">🚗</span>
                        <span className="nav-bottom-text">Pilot</span>
                    </button>
                )}
                
                {isPilot && (
                    <div className="nav-bottom-status">
                        <StatusToggle />
                    </div>
                )}
                
                <button className="nav-bottom-btn nav-bottom-logout" onClick={handleLogout}>
                    <span className="nav-bottom-icon">🚪</span>
                    <span className="nav-bottom-text">Logout</span>
                </button>
            </nav>
        </>
    );
};

export default Navbar;