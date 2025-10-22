import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import PilotDashboard from "../pages/pilot/Dashboard";
import LocationsPage from "../pages/locations";
import { TripProvider } from "../context/TripContext";
import { initSocket } from "../middlewares/socket";
import RequestModal from "../modal/pilot/tripRequest";

function PilotApp() {
  const [incomingTrip, setIncomingTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const socket = initSocket();

    socket.on("connect", () => {
      console.log("✅ Pilot connected:", socket.id);
    });

    socket.on("tripRequest", (data) => {
      console.log("🚗 New trip for pilot:", data);
      setIncomingTrip(data);
      setShowModal(true);
    });

    return () => {
      socket.off("tripRequest");
    };
  }, []);

  return (
    <TripProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PilotDashboard />} />
          <Route path="/pilot/dashboard" element={<PilotDashboard />} />
          <Route path="/locations" element={<LocationsPage />} />
        </Routes>

        {showModal && incomingTrip && (
          <RequestModal
            tripId={incomingTrip.tripId}
            pickupLocation={incomingTrip.pickupLocation}
            dropLocation={incomingTrip.dropLocation}
            fare={incomingTrip.fare}
            onClose={() => setShowModal(false)}
          />
        )}
      </Router>
    </TripProvider>
  );
}

export default PilotApp;
