import React, { useEffect, useState } from "react";
import { getUserById, deleteUser } from "../../api/admin/adminClient";
import { X, User, Mail, Shield, Trash2, AlertCircle, Loader } from "lucide-react";
import "./style/UserModal.css";

const UserModal = ({ userId, onClose, onDeleted }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone and will permanently remove all user data.")) return;

    try {
      setDeleting(true);
      await deleteUser(userId);
      onDeleted(userId);
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setDeleting(false);
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      consumer: { label: "Consumer", color: "#059669", bgColor: "#d1fae5" },
      pilot: { label: "Pilot", color: "#3b82f6", bgColor: "#dbeafe" },
      admin: { label: "Administrator", color: "#f59e0b", bgColor: "#fef3c7" }
    };
    
    return roleConfig[role] || { label: role, color: "#6b7280", bgColor: "#f3f4f6" };
  };

  if (!userId) return null;

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-title">
            <User size={24} />
            <h2>User Details</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="modal-loading">
            <Loader className="loading-spinner" size={32} />
            <p>Loading user details...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="modal-error">
            <AlertCircle size={32} />
            <h3>Error Loading User</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        {/* User Details */}
        {user && !loading && (
          <div className="user-details">
            {/* User Profile */}
            <div className="user-profile">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.name || "No Name Provided"}</h3>
                <div className="user-email">
                  <Mail size={16} />
                  {user.email}
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="detail-section">
              <h3 className="section-title">Account Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-icon">
                    <Shield size={16} />
                  </div>
                  <div className="detail-content">
                    <label>Account Role</label>
                    <div 
                      className="role-badge"
                      style={{ 
                        color: getRoleBadge(user.role).color, 
                        backgroundColor: getRoleBadge(user.role).bgColor 
                      }}
                    >
                      {getRoleBadge(user.role).label}
                    </div>
                  </div>
                </div>

                {user.department && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <User size={16} />
                    </div>
                    <div className="detail-content">
                      <label>Department</label>
                      <p>{user.department}</p>
                    </div>
                  </div>
                )}

                {user.studentID && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <Mail size={16} />
                    </div>
                    <div className="detail-content">
                      <label>Student ID</label>
                      <p>{user.studentID}</p>
                    </div>
                  </div>
                )}

                {user.vehicleType && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <Shield size={16} />
                    </div>
                    <div className="detail-content">
                      <label>Vehicle Type</label>
                      <p>{user.vehicleType}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Status */}
            <div className="detail-section">
              <h3 className="section-title">Account Status</h3>
              <div className="status-info">
                <div className="status-item">
                  <label>Registration Date</label>
                  <p>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
                <div className="status-item">
                  <label>Last Updated</label>
                  <p>{new Date(user.updatedAt || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button 
                className="action-btn delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <div className="loading-spinner-small"></div>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete User
                  </>
                )}
              </button>
              <button 
                className="action-btn close-action-btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!user && !loading && !error && (
          <div className="modal-empty">
            <User size={48} />
            <h3>No User Data</h3>
            <p>User information is not available or the user does not exist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;