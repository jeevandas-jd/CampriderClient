import { useState } from "react";
import { resetPassword } from "../api/auth";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleReset = async () => {
    try {
      const res = await resetPassword({ token, newPassword });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ResetPassword;
