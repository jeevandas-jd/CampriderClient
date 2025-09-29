import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // we'll create this CSS next

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Camprider</h1>
        <p className="home-tagline">Your reliable ride, every time.</p>
        <div className="home-buttons">
          <button className="btn btn-login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-register" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
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
