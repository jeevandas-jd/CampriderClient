import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/NavBar";
import TripModal from "../modal/tripModal/trip";
import "./style/Home.css";
import { getTripInfo } from "../middlewares/consumer/tripInfo";
import TripConsole from "../components/trip/tripConsole";
const Home = () => {
  const [role] = useState(localStorage.getItem("role"));
  const [isAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showTripModal, setShowTripModal] = useState(false);
  const navigate = useNavigate();
  const tripData = getTripInfo()?.trip
  const handleOpenTripModal = () => setShowTripModal(true);
  const handleCloseTripModal = () => setShowTripModal(false);

  return (
    <div className="home-container">
      <Navbar />

      <header className="home-header">
        <div className="home-header-content">
          <h1 className="home-title">CampRider</h1>
          <p className="home-tagline">Your reliable ride, every time.</p>

          {!isAuthenticated ? (
            <div className="home-auth-buttons">
              <button
                className="home-btn home-btn-login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="home-btn home-btn-register"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          ) : (
            role === "consumer" && (
              // START FIX: Wrap the two sibling components in a React Fragment
              <>
                {/* 1. Make A Trip Button */}
                {!tripData && ( // Only show Make A Trip button if no active trip
                    <button
                        className="home-btn home-btn-trip"
                        onClick={handleOpenTripModal}
                    >
                        Make A Trip
                    </button>
                )}
                
                {/* 2. Trip Console */}
                {/* NOTE: You should pass tripData._id, which is the MongoDB ID, 
                   but the trip object also contains 'tripId' which is likely your formatted ID */}
                {tripData && (
                    <TripConsole 
                        tripId={tripData.tripId} 
                        pickupLocation={tripData.pickupLocation} 
                        dropLocation={tripData.dropLocation} 
                        fare={tripData.fare}
                        status={tripData.status}
                        pioltId={tripData.pioltId} // Pass status for correct display
                    />
                )}
              </>
              // END FIX
            )
          )}
        </div>

        {/* Render trip modal */}
        {showTripModal && <TripModal onClose={handleCloseTripModal} />}
      </header>


    </div>
  );
};

export default Home;
