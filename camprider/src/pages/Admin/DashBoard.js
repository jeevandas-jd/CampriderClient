import { useState } from "react";
import React from "react";
import Navbar from "../../components/pilot/NavBar";
import GetUsers from "../../components/admin/getUsers";
const AdminDashBoard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    
    if (!user) {
        return <div>Loading...</div>;
    }
  return(
    <div>
        <Navbar/>
        <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "50px" }}>
         <h2>Admin Dashboard</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
    <div>
        <h1>admin tools</h1>
        <GetUsers/>
    </div>
    </div>
  )
};

export default AdminDashBoard;