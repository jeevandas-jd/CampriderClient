
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FillInfo from "../../components/pilot/FillInfo";
import React from "react";
import Navbar from "../../components/navbar/NavBar";
import baseURL from "../../api/baseUrl";
import {io} from "socket.io-client";
import RequestModal from "../../modal/pilot/tripRequest";



const PilotDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user= JSON.parse(localStorage.getItem("user"));
    const [tripRequest, setTripRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {

        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);
    if (!user) {
        return <div>Pilot Dashboard is  Loading...</div>;
    }
    if (user.FormSubmitted === false) {
        return <FillInfo />;
    }
    const socket = io("http://localhost:5001"); 
    console.log("Connecting to server...");
    socket.on("connect", () => {
        console.log("Connected to server with ID:", socket.id);
        //socket.emit("pilot-online",localStorage.getItem("userId"));
    });

    socket.on("tripRequest", (data) => {

      console.log("Received trip request:", data);
        setTripRequest(data);
        setShowModal(true);
    });
  return (
    <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "50px" }}>
        <Navbar/>
         <h2>Pilot Dashboard</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Department:</strong> {user.department}</p>
      <p><strong>Vehicle Type:</strong> {user.vehicleType}</p>
      <p><strong>Vehicle Number:</strong> {user.vehicleNumber}</p>
      <p><strong>Rating:</strong> {user.ratingAverage}</p>
      {showModal && tripRequest && (
        <RequestModal 
          tripId={tripRequest.tripId}
          pickupLocation={tripRequest.pickupLocation}
          dropLocation={tripRequest.dropLocation}
          fare={tripRequest.fare}
        />
      )}
      {/* <StatusToggle /> */}
    </div>
  )
};

export default PilotDashboard;