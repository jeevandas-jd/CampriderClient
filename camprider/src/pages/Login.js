import { use, useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);

      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));
      if(user.role==="pilot"){ 
          
        navigate('/pilot/dashboard', { state: { user } });
        return;
        
      }
      else if(user.role==="consumer"){
        navigate('/consumer/dashboard', { state: { user } });
        return;
      }
      else if(user.role==="admin"){
        navigate('/admin/dashboard', { state: { user } });
        return;
      }
      window.location.href = "/profile";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
