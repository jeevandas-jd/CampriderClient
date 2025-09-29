import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
        const role="consumer"
      const res = await registerUser({ email, password, role });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="consumer">Consumer</option>
            
        </select>
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
