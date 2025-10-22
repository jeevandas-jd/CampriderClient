import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import PilotApp from "./Apps/PilotApp";
import ConsumerApp from "./Apps/ConsumerApp";
import AdminApp from "./Apps/AdminApp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
if(user){
  console.log("Logged in user:", user);
}
  // Determine user role
  if (user?.role === "pilot") return <PilotApp />;
  if (user?.role === "consumer") return <ConsumerApp />;
  if (user?.role === "admin") return <AdminApp />;

  // Default (when not logged in)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
