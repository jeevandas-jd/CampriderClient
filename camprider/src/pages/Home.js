import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/NavBar";
import TripModal from "../modal/tripModal/trip";
import "./Home.css";

const Home = () => {
  const [role] = useState(localStorage.getItem("role"));
  const [isAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showTripModal, setShowTripModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenTripModal = () => {
    setShowTripModal(true);
  };

  const handleCloseTripModal = () => {
    setShowTripModal(false);
  };

  return (
    <div className="home-container">
      <Navbar />
      <header className="home-header">
        <h1 className="home-title">Camprider</h1>
        <p className="home-tagline">Your reliable ride, every time.</p>

        {!isAuthenticated && (
          <div className="home-buttons">
            <button className="btn btn-login" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn btn-register" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        )}

        {isAuthenticated && role === "consumer" && (
          <button className="btn btn-trip" onClick={handleOpenTripModal}>
            Make A Trip
          </button>
        )}

        {/* Render the modal conditionally */}
        {showTripModal && <TripModal onClose={handleCloseTripModal} />}
      </header>

      <section className="home-hero">
        <img
          src="https://images.unsplash.com/photo-1602767730933-870dbd4f1f0c?auto=format&fit=crop&w=1350&q=80"
          alt="Camprider Hero"
          className="home-hero-img"
        />
        <div className="home-hero-text">
          <h2>Fast. Safe. Reliable.</h2>
          <p>Camprider connects you with certified pilots for a smooth ride experience anywhere, anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
