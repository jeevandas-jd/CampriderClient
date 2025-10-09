

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import StatusToggle from "../pilot/statusTogle";
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
        if(role==="pilot"){
            navigate('/pilot/dashboard');
        }
        else if(role==="consumer"){
            navigate('/consumer/dashboard');
        }
        else if(role==="admin"){
            setIsAdmin(true);
            navigate('/profile');
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
                <button onClick={handleLocations}>Locations</button>
                {isAdmin && <button onClick={() => navigate('/admin/dashboard')}>Admin Console</button>}
                {isPilot && <button onClick={() => navigate('/pilot/dashboard')}>Pilot Dashboard</button>}
                {isPilot && <StatusToggle/>}
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;