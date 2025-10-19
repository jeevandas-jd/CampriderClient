import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";
import { initSocket } from "../middlewares/socket";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));
      
      if(user.role === "pilot"){ 
       
        navigate('/pilot/dashboard', { state: { user } });
        

      }
      else if(user.role === "consumer"){
        navigate('/consumer/dashboard', { state: { user } });
      }
      else if(user.role === "admin"){
        navigate('/admin/dashboard', { state: { user } });
      }
      else {
        navigate('/profile', { state: { user } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🚲</div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your CampRider account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner-small"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{" "}
            <span 
              className="login-footer-link"
              onClick={() => navigate('/register')}
            >
              Sign up
            </span>
          </p>
          <p 
            className="login-footer-link forgot-password"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot your password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;