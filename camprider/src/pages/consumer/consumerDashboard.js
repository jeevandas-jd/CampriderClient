import React from "react";
import { useState } from "react";
import Navbar from "../../components/pilot/NavBar";
const ConsumerDashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    
    if (!user) {
        return <div>Loading...</div>;
    }
    if (user.FormSubmitted === false) {
        return <div>Please complete your profile information.</div>;
    }
  return (
    
    <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "50px" }}>
        <Navbar/>
         <h2>Consumer Dashboard</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Department:</strong> {user.department}</p>
      <p><strong>Student ID:</strong> {user.studentID}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
     <p><strong>contactNumber</strong>{user.contactNo}</p>
    </div>
  )
};

export default ConsumerDashboard;