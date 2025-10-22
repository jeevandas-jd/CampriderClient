import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { X, MapPin, Navigation, DollarSign, CheckCircle, XCircle, Clock } from "lucide-react";
import "./style/RequestModal.css";
import { getSocket } from "../../middlewares/socket";
const RequestModal = ({ tripId, pickupLocation, dropLocation, fare, onClose }) => {
  //const [socket, setSocket] = useState(null);
  const [responding, setResponding] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const socket=getSocket();


  const handleAccept = async () => {
    if (!socket || responding) return;
    
    setResponding(true);
    try {
      socket.emit("pilotResponse", {
        tripId,
        status: "accept",
        pilotId: localStorage.getItem("userId"),
      });
      console.log("socket emitted ,socketid:",socket.id);
      setResponseStatus("accepted");
      
      // Auto close after successful response
      setTimeout(() => {
        
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Error accepting trip:", error);
      alert("Failed to accept trip. Please try again.");
    } finally {
      setResponding(false);
    }
  };

  const handleReject = async () => {
    if (!socket || responding) return;
    
    setResponding(true);
    try {
      socket.emit("pilotResponse", {
        tripId,
        status: "reject",
        pilotId: localStorage.getItem("userId"),
      });
      setResponseStatus("rejected");
      
      // Auto close after successful response
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Error rejecting trip:", error);
      alert("Failed to reject trip. Please try again.");
    } finally {
      setResponding(false);
    }
  };

  const getStatusContent = () => {
    switch (responseStatus) {
      case "accepted":
        return {
          icon: <CheckCircle size={48} />,
          title: "Trip Accepted!",
          message: "You have successfully accepted the trip.",
          color: "#059669"
        };
      case "rejected":
        return {
          icon: <XCircle size={48} />,
          title: "Trip Rejected",
          message: "You have declined this trip request.",
          color: "#dc2626"
        };
      default:
        return null;
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="request-modal-overlay">
      <div className="request-modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="header-title">
            <Navigation size={24} />
            <h2>New Trip Request</h2>
          </div>
          {!responseStatus && (
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Response Status */}
        {statusContent && (
          <div className="response-status" style={{ color: statusContent.color }}>
            {statusContent.icon}
            <h3>{statusContent.title}</h3>
            <p>{statusContent.message}</p>
          </div>
        )}

        {/* Trip Details */}
        {!statusContent && (
          <div className="trip-details">
            <div className="trip-header">
              <div className="trip-badge">
                <Clock size={16} />
                <span>New Request</span>
              </div>
              <div className="trip-id">ID: {tripId}</div>
            </div>

            <div className="location-section">
              <div className="location-item pickup">
                <div className="location-icon">
                  <MapPin size={20} />
                </div>
                <div className="location-content">
                  <label>Pickup Location</label>
                  <p>{pickupLocation}</p>
                </div>
              </div>

              <div className="location-arrow">↓</div>

              <div className="location-item drop">
                <div className="location-icon">
                  <Navigation size={20} />
                </div>
                <div className="location-content">
                  <label>Drop Location</label>
                  <p>{dropLocation}</p>
                </div>
              </div>
            </div>

            <div className="fare-section">
              <div className="fare-icon">
                <DollarSign size={20} />
              </div>
              <div className="fare-content">
                <label>Trip Fare</label>
                <p className="fare-amount">₹{fare}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="action-btn accept-btn"
                onClick={handleAccept}
                disabled={responding}
              >
                {responding ? (
                  <div className="loading-spinner-small"></div>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Accept Trip
                  </>
                )}
              </button>
              
              <button
                className="action-btn reject-btn"
                onClick={handleReject}
                disabled={responding}
              >
                {responding ? (
                  <div className="loading-spinner-small"></div>
                ) : (
                  <>
                    <XCircle size={18} />
                    Reject
                  </>
                )}
              </button>
            </div>

            <div className="response-note">
              <Clock size={14} />
              <span>Please respond within 30 seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestModal;