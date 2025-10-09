import { useState } from "react";
import React from "react";
import Navbar from "../../components/navbar/NavBar";
import GetUsers from "../../components/admin/getUsers";
import PilotUsers from "../../components/admin/pilotUsers";
import AddLocations from "../../components/admin/addLocations";

// Basic CSS for a console-like look (ideally, this would be in a separate CSS/Styled-Components file)
const consoleStyles = {
    // General body/main container styles
    mainContainer: {
        display: "flex",
        minHeight: "100vh", // Full height
        backgroundColor: "#232F3E", // Dark background, similar to AWS/Console
        color: "#FFFFFF", // Light text color
    },
    // Navigation/Sidebar styles
    sidebar: {
        width: "250px", // Fixed width for the menu
        backgroundColor: "#1D2731", // Slightly darker sidebar
        padding: "20px 15px",
        borderRight: "1px solid #3A475C", // Separator line
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
    },
    // Main Content Area styles
    contentArea: {
        flexGrow: 1, // Takes up the remaining space
        padding: "20px 30px",
        overflowY: "auto", // Scroll if content is too long
    },
    // Heading styles
    header: {
        color: "#FF9900", // Highlight color for titles (e.g., AWS orange)
        borderBottom: "1px solid #3A475C",
        paddingBottom: "10px",
        marginBottom: "20px",
    },
    // User info box
    userInfoBox: {
        backgroundColor: "#3A475C",
        padding: "15px",
        borderRadius: "4px",
        marginBottom: "30px",
        borderLeft: "5px solid #FF9900",
    },
    // Tool/Section styles
    toolSection: {
        backgroundColor: "#1D2731", // Dark background for tool containers
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "20px",
        border: "1px solid #3A475C",
    }
};

const AdminDashBoard = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // State for active tool/menu selection (for a true console experience)
    const [activeTool, setActiveTool] = useState("UserOverview");

    // Menu options for the sidebar
    const menuItems = [
        { id: "UserOverview", name: "User Overview" },
        { id: "ManageAllUsers", name: "Manage All Users (GetUsers)" },
        { id: "PilotUserMgmt", name: "Pilot User Management (PilotUsers)" },
        { id: "AddLocations", name: "Add Locations"},

        // Add more tools/sections here
    ];

    // Function to render the active component based on the menu selection
    const renderToolComponent = () => {
        switch (activeTool) {
            case "ManageAllUsers":
                return (
                    <div style={consoleStyles.toolSection}>
                        <h3 style={{ color: "#FF9900" }}>User Management Console</h3>
                        <GetUsers />
                    </div>
                );
            case "AddLocations":
                return (
                    <div style={consoleStyles.toolSection}>
                        <h3 style={{ color: "#FF9900" }}>Add New Locations</h3>
                        <AddLocations />
                    </div>
                );
            case "PilotUserMgmt":
                return (
                    <div style={consoleStyles.toolSection}>
                        <h3 style={{ color: "#FF9900" }}>Pilot Program Users</h3>
                        <PilotUsers />
                    </div>
                );
            case "UserOverview":
            default:
                return (
                    <div style={consoleStyles.userInfoBox}>
                        <h3 style={{ color: "#FFFFFF", marginTop: 0 }}>Account Overview</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> <span style={{ color: "#FF9900", fontWeight: "bold" }}>{user.role}</span></p>
                        <p style={{ color: "#A0A0A0", fontSize: "0.9em" }}>
                            Status: <span style={{ color: "lightgreen" }}>ACTIVE</span> | Region: GLOBAL
                        </p>
                    </div>
                );
        }
    };

    if (!user) {
        return <div style={{ color: "white", backgroundColor: "#232F3E", minHeight: "100vh", padding: "20px" }}>Loading... or Please Log In.</div>;
    }

    return (
        <div>
            {/* The Navbar can stay, often used for top-level account/search/logout */}
            <Navbar /> 

            <div style={consoleStyles.mainContainer}>
                {/* 1. SIDEBAR NAVIGATION */}
                <div style={consoleStyles.sidebar}>
                    <h2 style={consoleStyles.header}>Services</h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {menuItems.map((item) => (
                            <li 
                                key={item.id}
                                onClick={() => setActiveTool(item.id)}
                                style={{
                                    padding: "10px",
                                    marginBottom: "5px",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    backgroundColor: activeTool === item.id ? "#3A475C" : "transparent", // Highlight active item
                                    color: activeTool === item.id ? "#FF9900" : "#E0E0E0", // Highlight text
                                    fontWeight: activeTool === item.id ? "bold" : "normal",
                                    transition: "background-color 0.2s"
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. MAIN CONTENT AREA */}
                <div style={consoleStyles.contentArea}>
                    <h1 style={consoleStyles.header}>Admin Console - {activeTool.replace(/([A-Z])/g, ' $1').trim()}</h1>
                    
                    {/* The actively selected tool/view is rendered here */}
                    {renderToolComponent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;