import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/NavBar";
import TripModal from "../modal/tripModal/trip";
import "./style/Home.css";

const Home = () => {
  const [role] = useState(localStorage.getItem("role"));
  const [isAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showTripModal, setShowTripModal] = useState(false);
  const navigate = useNavigate();

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
              <button
                className="home-btn home-btn-trip"
                onClick={handleOpenTripModal}
              >
                Make A Trip
              </button>
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
