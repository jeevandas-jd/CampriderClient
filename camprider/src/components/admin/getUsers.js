import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, getUserById } from "../../api/admin/adminClient";
import UserModal from "../../modal/admin/userModal";

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

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Users</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user._id}
            style={{
              padding: "0.5rem 0",
              borderBottom: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {user.name} - {user.email} - <strong>{user.role}</strong>
            </span>

            <button
              onClick={() => setSelectedUserId(user._id)}
              style={{
                padding: "0.25rem 0.5rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "white",
              }}
            >
              View / Delete
            </button>
          </li>
        ))}
      </ul>

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
