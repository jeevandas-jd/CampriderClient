
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FillInfo from "../../components/pilot/FillInfo";
import React from "react";
import Navbar from "../../components/pilot/NavBar";
const PilotDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user= JSON.parse(localStorage.getItem("user"));

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
  return (
    <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "50px" }}>
        <Navbar />
         <h2>Pilot Dashboard</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Department:</strong> {user.department}</p>
      <p><strong>Vehicle Type:</strong> {user.vehicleType}</p>
      <p><strong>Vehicle Number:</strong> {user.vehicleNumber}</p>
      <p><strong>Rating:</strong> {user.ratingAverage}</p>
    </div>
  )
};

export default PilotDashboard;