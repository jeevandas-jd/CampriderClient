import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Shield, CheckCircle, AlertCircle } from "lucide-react";
import "./style/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "consumer"
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await registerUser(formData);
      setMessage(res.data.message || "Registration successful! Redirecting to login...");
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">🚲</div>
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join CampRider today</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          {/* Messages */}
          {message && (
            <div className="message success">
              <CheckCircle size={16} />
              <span>{message}</span>
            </div>
          )}
          {error && (
            <div className="message error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={16} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock size={16} />
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="form-input"
              required
              disabled={loading}
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              <Shield size={16} />
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            >
              <option value="consumer">🚶 Consumer - Book Rides</option>
              <option value="pilot">🚗 Pilot - Provide Rides</option>
            </select>
            <p className="role-description">
              {formData.role === "consumer" 
                ? "Book rides around campus as a consumer"
                : "Earn by providing rides as a pilot"
              }
            </p>
          </div>

          <button 
            type="submit" 
            className="register-btn"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner-small"></div>
            ) : (
              <>
                <User size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            Already have an account?{" "}
            <span 
              className="footer-link"
              onClick={() => navigate('/login')}
            >
              Sign in
            </span>
          </p>
          <p className="terms-text">
            By creating an account, you agree to our{" "}
            <span className="terms-link">Terms of Service</span> and{" "}
            <span className="terms-link">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;