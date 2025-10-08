

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));
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

    const handleDashboard = () => {
        if(role==="pilot"){
            navigate('/pilot/dashboard');
        }
        else if(role==="consumer"){
            navigate('/consumer/dashboard');
        }
        
        else{
            navigate('/profile');
        }
    }

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <div>
                <button onClick={handleHome}>Home</button>
                <button onClick={handleDashboard}>Profile</button>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;