import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const RequestModal = ({ tripId, pickupLocation, dropLocation, fare }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create socket connection once when modal mounts
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleAccept = () => {
    if (!socket) return;
    socket.emit("pilotResponse", {
      tripId,
      status: "accept",
      pilotId: localStorage.getItem("userId"),
    });
    alert("✅ Trip Accepted");
  };

  const handleReject = () => {
    if (!socket) return;
    socket.emit("pilotResponse", {
      tripId,
      status: "reject",
      pilotId: localStorage.getItem("userId"),
    });
    alert("❌ Trip Rejected");
  };

  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "400px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>🚗 New Trip Request</h3>
      <p><strong>Trip ID:</strong> {tripId}</p>
      <p><strong>Pickup:</strong> {pickupLocation}</p>
      <p><strong>Drop:</strong> {dropLocation}</p>
      <p><strong>Fare:</strong> ₹{fare}</p>
      <button
        style={{
          marginRight: "10px",
          backgroundColor: "green",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleAccept}
      >
        Accept
      </button>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleReject}
      >
        Reject
      </button>
    </div>
  );
};

export default RequestModal;
