import React, { useContext } from "react";
import { completePilotProfile } from "../../api/pilot/pilotClient";

import { useState,useEffect } from "react";
const FillInfo = () => {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
    const [gender, setGender] = useState("");
    const [studentID, setStudentId] = useState("");
    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("User not authenticated");
            return;
        }
        try {
            const res = await completePilotProfile( {name, department,studentID, gender,vehicleType, vehicleNumber});
            setSuccess("Profile updated successfully");
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Profile update failed");
            setSuccess("");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
            <h2>Complete Pilot Profile</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            <input placeholder="Vehicle Type" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} />
            <input placeholder="Vehicle Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
            <input placeholder="Student ID" value={studentID} onChange={(e) => setStudentId(e.target.value)} />
            <input placeholder="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );      
}

export default FillInfo;