
import { updateIamLive } from "../../api/pilot/pilotClient";
import { useState } from "react";
import {io} from "socket.io-client";
import baseURL from "../../api/baseUrl"
const socket = io(baseURL);

const StatusToggle = () => {
    const [isLive, setIsLive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleToggle = async () => {
        setLoading(true);
        setError("");
        try {
            await updateIamLive();
            setIsLive(!isLive);

            if (socket && socket.connected) {
                socket.emit("pilot-online",localStorage.getItem("userId"));
            }else{
                socket.emit("pilot-offline",localStorage.getItem("userId"));
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                onClick={handleToggle}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    backgroundColor: isLive ? "red" : "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Updating..." : isLive ? "Go Offline" : "Go Live"}
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
};

export default StatusToggle;
