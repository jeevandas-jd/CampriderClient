import { useState } from "react";
import { forgotPassword } from "../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await forgotPassword({ email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending link");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Send Reset Link</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ForgotPassword;
