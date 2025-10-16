import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import Navbar from "../components/navbar/NavBar";
import "./style/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view profile");
        setLoading(false);
        return;
      }
      
      try {
        const res = await getProfile(token);
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getRoleBadge = (role) => {
    const roleConfig = {
      consumer: { label: "Consumer", color: "#059669", bgColor: "#d1fae5" },
      pilot: { label: "Pilot", color: "#3b82f6", bgColor: "#dbeafe" },
      admin: { label: "Administrator", color: "#f59e0b", bgColor: "#fef3c7" }
    };
    
    return roleConfig[role] || { label: role, color: "#6b7280", bgColor: "#f3f4f6" };
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-error">
          <div className="error-icon">⚠️</div>
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-error">
          <div className="error-icon">👤</div>
          <h2>Profile Not Found</h2>
          <p>Unable to load profile information</p>
        </div>
      </div>
    );
  }

  const roleBadge = getRoleBadge(profile.role);

  return (
    <div className="profile-container">
      <Navbar />
      
      <div className="profile-content">
        <header className="profile-header">
          <div className="profile-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className="profile-title">User Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </header>

        <div className="profile-card">
          <div className="profile-section">
            <h3 className="profile-section-title">Personal Information</h3>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <label className="profile-info-label">User ID</label>
                <p className="profile-info-value">{profile.message || "N/A"}</p>
              </div>
              
              {profile.name && (
                <div className="profile-info-item">
                  <label className="profile-info-label">Full Name</label>
                  <p className="profile-info-value">{profile.name}</p>
                </div>
              )}
              
              {profile.email && (
                <div className="profile-info-item">
                  <label className="profile-info-label">Email Address</label>
                  <p className="profile-info-value">{profile.email}</p>
                </div>
              )}
              
              <div className="profile-info-item">
                <label className="profile-info-label">Account Role</label>
                <div 
                  className="role-badge"
                  style={{ 
                    color: roleBadge.color, 
                    backgroundColor: roleBadge.bgColor 
                  }}
                >
                  {roleBadge.label}
                </div>
              </div>
            </div>
          </div>

          {profile.role === "pilot" && (
            <div className="profile-section">
              <h3 className="profile-section-title">Pilot Information</h3>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <label className="profile-info-label">License Number</label>
                  <p className="profile-info-value">{profile.licenseNumber || "Not provided"}</p>
                </div>
                <div className="profile-info-item">
                  <label className="profile-info-label">Vehicle Type</label>
                  <p className="profile-info-value">{profile.vehicleType || "Not specified"}</p>
                </div>
              </div>
            </div>
          )}

          <div className="profile-section">
            <h3 className="profile-section-title">Account Actions</h3>
            <div className="profile-actions">
              <button className="profile-btn profile-btn-primary">
                Edit Profile
              </button>
              <button className="profile-btn profile-btn-secondary">
                Change Password
              </button>
              <button className="profile-btn profile-btn-danger">
                Logout All Devices
              </button>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h4>Member Since</h4>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h4>Status</h4>
              <p>Active</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <h4>Verification</h4>
              <p>Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;