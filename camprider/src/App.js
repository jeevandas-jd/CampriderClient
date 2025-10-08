import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PilotDashboard from "./pages/pilot/Dashboard";
import ConsumerDashboard from "./pages/consumer/consumerDashboard";
import AdminDashBoard from "./pages/Admin/DashBoard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pilot/dashboard" element={<PilotDashboard />} />
        <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
