import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, getUserById } from "../../api/admin/adminClient";
import UserModal from "../../modal/admin/userModal";
import { Users, Eye, Trash2, User, Mail, Shield, Loader } from "lucide-react";
import "./style/GetUsers.css";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserDeleted = (id) => {
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      consumer: { label: "Consumer", color: "#059669", bgColor: "#d1fae5" },
      pilot: { label: "Pilot", color: "#3b82f6", bgColor: "#dbeafe" },
      admin: { label: "Admin", color: "#f59e0b", bgColor: "#fef3c7" }
    };
    
    return roleConfig[role] || { label: role, color: "#6b7280", bgColor: "#f3f4f6" };
  };

  if (loading) {
    return (
      <div className="users-loading">
        <Loader className="loading-spinner" size={32} />
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-error">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Users</h3>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="get-users-container">
      <div className="users-header">
        <div className="header-content">
          <Users size={24} />
          <h2>User Management</h2>
          <span className="users-count">{users.length} users</span>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <Users size={48} className="empty-icon" />
          <h3>No Users Found</h3>
          <p>There are no users in the system yet.</p>
        </div>
      ) : (
        <div className="users-table-container">
          <div className="users-table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-cell user-info">User Information</div>
                <div className="table-cell role">Role</div>
                <div className="table-cell actions">Actions</div>
              </div>
            </div>
            
            <div className="table-body">
              {users.map((user) => {
                const roleBadge = getRoleBadge(user.role);
                return (
                  <div key={user._id} className="table-row user-row">
                    <div className="table-cell user-info">
                      <div className="user-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.name || "No Name"}</div>
                        <div className="user-email">
                          <Mail size={14} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                    
                    <div className="table-cell role">
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
                    
                    <div className="table-cell actions">
                      <button
                        onClick={() => setSelectedUserId(user._id)}
                        className="action-btn view-btn"
                        title="View User Details"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedUserId && (
        <UserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
};

export default GetUsers;