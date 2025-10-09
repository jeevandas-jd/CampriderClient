import { useEffect, useState } from "react";
import { getUserById, deleteUser } from "../../api/admin/adminClient";

const UserModal = ({ userId, onClose, onDeleted }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 1. FIX: Removed nested useEffect and fixed state initialization logic
  useEffect(() => {
    if (!userId) {
        // If userId is falsy (e.g., null or 0), reset state and stop loading
        setUser(null);
        setLoading(false);
        return;
    }

    // Reset state for the new user fetch
    setLoading(true);
    setError(null);
    setUser(null); // Clear previous user data

    const FetchUser = async () => {
      try {
        const res = await getUserById(userId); // API call to /users/:id
        setUser(res.data);
        console.log("user seted 1",user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    FetchUser();
    // Dependency array ensures this runs only when userId changes
  }, [userId]);
  useEffect(() => {
    if (user) {
      console.log("user seted", user);
    }
  }, [user]);
  // 2. FIX: Remove this console.log block (it was nested incorrectly before)
  // If you need to log the user state after it changes, use this:
  // useEffect(() => {
  //     if (user) {
  //         console.log("User state updated:", user);
  //     }
  // }, [user]);


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user? This action is irreversible.")) return;

    try {
      setDeleting(true);
      await deleteUser(userId); // API call to delete user
      // No alert needed, as per UX best practices, rely on parent component update
      onDeleted(userId); // parent can remove user from list
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      // Use a more subtle notification in a real app
      alert("Failed to delete user: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setDeleting(false);
    }
  };

  // 3. FIX: Check if the modal should be open (based on userId)
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
      // Optional: Close modal on backdrop click
      onClick={onClose} 
    >
      <div
        style={{
          backgroundColor: "red",
          padding: "1rem",
          borderRadius: "6px",
          minWidth: "300px",
          maxWidth: "90%",
          
        }}
        // Stop click propagation so clicking inside the modal doesn't close it
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>User Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Show user data only if loading is false and user is set */}
        {!loading && user && (
          <div>
            <p>
              <strong>Name:</strong> 
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> 
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
        
        {/* Show this if not loading, no error, and no user (e.g., deleted or not found) */}
        {!loading && !error && !user && userId && (
             <p>User details are not available or the user does not exist.</p>
        )}
      </div>
    </div>
  );
};

export default UserModal;