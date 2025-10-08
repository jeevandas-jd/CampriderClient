import { useEffect, useState } from "react";
import { getUserById, deleteUser } from "../../api/admin/adminClient"

const UserModal = ({ userId, onClose, onDeleted }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await getUserById(userId); // API call to /users/:id
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeleting(true);
      await deleteUser(userId); // API call to delete user
      alert("User deleted successfully!");
      onDeleted(userId); // parent can remove user from list
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  if (!userId) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "6px",
          minWidth: "300px",
          maxWidth: "90%",
        }}
      >
        <h2>User Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  backgroundColor: "crimson",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: deleting ? "not-allowed" : "pointer",
                }}
              >
                {deleting ? "Deleting..." : "Delete User"}
              </button>

              <button
                onClick={onClose}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
