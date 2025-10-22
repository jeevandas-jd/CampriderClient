import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsumerDashboard from "../pages/consumer/consumerDashboard";

function ConsumerApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsumerDashboard />} />
        <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
      </Routes>
    </Router>
  );
}

export default ConsumerApp;
