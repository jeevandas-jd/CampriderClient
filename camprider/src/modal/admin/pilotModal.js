import { getPilotById,verifyPilot} from "../../api/admin/adminClient";

import { useEffect, useState } from "react";


const PilotModal = ({ pilotId,veifyID, onClose }) => {
    const [pilot, setPilot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pilotId) {
            console.log("pilotId is null");
            // If pilotId is falsy (e.g., null or 0), reset state and stop loading
            setPilot(null);
            setLoading(false);
            return;
        }

        // Reset state for the new pilot fetch
        setLoading(true);
        setError(null);
        setPilot(null); // Clear previous pilot data

        const FetchPilot = async () => {
            try {
                const res = await getPilotById(pilotId);
                console.log(res.data) // API call to /pilots/:id
                setPilot(res.data);
                console.log("pilot seted 1", pilot);
            } catch (err) {
                console.error("Error fetching pilot:", err);
                setError(err.response?.data?.message || "Failed to fetch pilot");
            } finally {
                setLoading(false);
            }
        };
        FetchPilot();
        // Dependency array ensures this runs only when pilotId changes
    }, [pilotId]);
    
    useEffect(() => {
        if (pilot) {
            console.log("pilot seted", pilot);
        }
    }, [pilot]);

    const handleVerify = async () => {
        if (!window.confirm("Are you sure you want to verify this pilot? This action is irreversible.")) return;

        try {
            await verifyPilot(pilotId); // API call to verify pilot
            alert("Pilot verified successfully.");
            onClose(); // Close the modal after verification
        } catch (err) {
            console.error("Error verifying pilot:", err);
            alert(err.response?.data?.message || "Failed to verify pilot");
        }
    };

    return (
        <div 
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            onClick={onClose} // Close modal when clicking outside the content
        >
            <div 
                style={{
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    padding: "20px",
                    borderRadius: "6px",
                    minWidth: "300px",
                    maxWidth: "90%",
                    textAlign: "center"
                }}
                // Stop click propagation so clicking inside the modal doesn't close it
                onClick={(e) => e.stopPropagation()} 
            >
                {loading ? (
                    <p>Loading pilot details...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : pilot ? (
                    <>
                        <h2>Pilot Details</h2>
                        <p><strong>Name:</strong> {pilot.name}</p>
                        <p><strong>Email:</strong> {pilot.email}</p>
                        <p><strong>License Number:</strong> {pilot.licenseNumber}</p>
                        <p><strong>Verified:</strong> {pilot.isVerified}</p>
                        {/* Add more pilot fields as needed */}
                        <button onClick={handleVerify} style={{ marginTop: "10px" }}>
                            Verify Pilot
                        </button>
                    </>
                ) : (
                    <p>No pilot data available.</p>
                )}
                <button onClick={onClose} style={{ marginTop: "10px" }}>Close</button>
            </div>
        </div>
    );
};

export default PilotModal;

