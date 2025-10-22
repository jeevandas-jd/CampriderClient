import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashBoard from "../pages/Admin/DashBoard";

function AdminApp() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<AdminDashBoard />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </Router>
  );
}

export default AdminApp;
