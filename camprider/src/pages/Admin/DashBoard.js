import React, { useState } from "react";
import Navbar from "../../components/navbar/NavBar";
import GetUsers from "../../components/admin/getUsers";
import PilotUsers from "../../components/admin/pilotUsers";
import AddLocations from "../../components/admin/addLocations";
import { Users, Bike, MapPin, Settings, Shield, BarChart3, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import "./style/AdminDashboard.css";

const AdminDashboard = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [activeTool, setActiveTool] = useState("UserOverview");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const menuItems = [
        { id: "UserOverview", name: "Dashboard Overview", icon: BarChart3 },
        { id: "ManageAllUsers", name: "Manage All Users", icon: Users },
        { id: "PilotUserMgmt", name: "Pilot Management", icon: Bike },
        { id: "AddLocations", name: "Location Management", icon: MapPin },
    ];

    const renderToolComponent = () => {
        switch (activeTool) {
            case "ManageAllUsers":
                return (
                    <div className="admin-tool-section">
                        <div className="tool-header">
                            <Users size={24} />
                            <h3>User Management</h3>
                        </div>
                        <GetUsers />
                    </div>
                );
            case "AddLocations":
                return (
                    <div className="admin-tool-section">
                        <div className="tool-header">
                            <MapPin size={24} />
                            <h3>Location Management</h3>
                        </div>
                        <AddLocations />
                    </div>
                );
            case "PilotUserMgmt":
                return (
                    <div className="admin-tool-section">
                        <div className="tool-header">
                            <Bike size={24} />
                            <h3>Pilot Management</h3>
                        </div>
                        <PilotUsers />
                    </div>
                );
            case "UserOverview":
            default:
                return (
                    <div className="admin-overview">
                        <div className="overview-header">
                            <h2>Dashboard Overview</h2>
                            <p>Welcome to your CampRider Admin Console</p>
                        </div>
                        
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon users">
                                    <Users size={24} />
                                </div>
                                <div className="stat-content">
                                    <h3>1,247</h3>
                                    <p>Total Users</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon pilots">
                                    <Bike size={24} />
                                </div>
                                <div className="stat-content">
                                    <h3>89</h3>
                                    <p>Active Pilots</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon locations">
                                    <MapPin size={24} />
                                </div>
                                <div className="stat-content">
                                    <h3>24</h3>
                                    <p>Locations</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon rides">
                                    <BarChart3 size={24} />
                                </div>
                                <div className="stat-content">
                                    <h3>5,892</h3>
                                    <p>Total Rides</p>
                                </div>
                            </div>
                        </div>

                        <div className="admin-profile-card">
                            <div className="profile-header">
                                <Shield size={24} />
                                <h3>Admin Profile</h3>
                            </div>
                            <div className="profile-info">
                                <div className="info-item">
                                    <label>Name</label>
                                    <p>{user.name}</p>
                                </div>
                                <div className="info-item">
                                    <label>Email</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="info-item">
                                    <label>Role</label>
                                    <div className="role-badge admin">Administrator</div>
                                </div>
                                <div className="info-item">
                                    <label>Status</label>
                                    <div className="status-badge active">Active</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    if (!user) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading Admin Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <Navbar />
            
            <div className="admin-container">
                {/* Sidebar Navigation */}
                <div className={`admin-sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                    <div className="sidebar-header">
                        <div className="admin-logo">
                            <Shield size={28} />
                        </div>
                        {!sidebarCollapsed && <h2>Admin Console</h2>}
                        <button 
                            className="sidebar-toggle"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>
                    
                    <nav className="sidebar-nav">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTool(item.id)}
                                    className={`nav-item ${activeTool === item.id ? 'nav-item-active' : ''}`}
                                    title={item.name}
                                >
                                    <IconComponent size={20} />
                                    {!sidebarCollapsed && <span>{item.name}</span>}
                                </button>
                            );
                        })}
                    </nav>
                    
                    {!sidebarCollapsed && (
                        <div className="sidebar-footer">
                            <div className="admin-quick-info">
                                <div className="admin-avatar">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                                </div>
                                <div className="admin-details">
                                    <p className="admin-name">{user.name}</p>
                                    <p className="admin-role">Administrator</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className={`admin-content ${sidebarCollapsed ? 'content-expanded' : ''}`}>
                    <header className="content-header">
                        <div className="header-left">
                            <button 
                                className="mobile-menu-toggle"
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            >
                                <Menu size={24} />
                            </button>
                            <h1>
                                {menuItems.find(item => item.id === activeTool)?.name || "Dashboard"}
                            </h1>
                        </div>
                        <div className="header-actions">
                            <button className="header-btn">
                                <Settings size={20} />
                                <span>Settings</span>
                            </button>
                        </div>
                    </header>

                    <div className="content-area">
                        {renderToolComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;