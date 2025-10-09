import { getAllPilots } from "../../api/admin/adminClient";
import PilotModal from "../../modal/admin/pilotModal";
import { useEffect, useState, useMemo } from "react";
import BenchManager from "./benchManager";
const PilotUsers = () => {
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationButton, setVerificationButton] = useState(false);
  const [selectedPilotId, setSelectedPilotId] = useState(null);
  const [Ids,setIDs]=useState([]);
  
  // New state for filter: 'all', 'approved', or 'not_approved'
  const [filterStatus, setFilterStatus] = useState('all'); 

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await getAllPilots();
        for (let i = 0; i < response.data.length; i++) {
          Ids.push(response.data[i]._id);
        }
        setIDs(Ids);
        console.log("pilot Ids",Ids);
        setPilots(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch pilots");
      } finally {
        setLoading(false);
      }
    };
    fetchPilots();
  }, []);

  const handleVerificationToggle = () => {
    setVerificationButton(!verificationButton);
  };
  
  const handleUserDeleted = (id) => {
    setPilots((prev) => prev.filter((u) => u._id !== id));
  };
  const handleBenchSettings=()=>{
    <BenchManager userIDs={Ids}/>
  }
  // Use useMemo to create the filtered list efficiently
  const filteredPilots = useMemo(() => {
    if (filterStatus === 'all') {
      return pilots;
    }
    
    // Convert filterStatus string to a boolean for comparison
    const isApprovedFilter = filterStatus === 'approved';

    return pilots.filter(pilot => pilot.isApproved === isApprovedFilter);
  }, [pilots, filterStatus]); // Recalculate only when pilots or filterStatus changes

  if (loading) return <div>Loading pilots...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Pilots ({filteredPilots.length} displayed)</h2>
      
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
          
        {/* Verification Toggle Button */}
        <button onClick={handleVerificationToggle}>
            {verificationButton ? "Hide Verification Status" : "Show Verification Status"}
        </button>
        <button >bench settings</button>
        {/* Filter Box for isApproved */}
        <label htmlFor="approved-filter" style={{ fontWeight: "bold" }}>Filter by Approval:</label>
        <select 
            id="approved-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #ccc" }}
        >
            <option value="all">All Pilots</option>
            <option value="approved">Approved Pilots</option>
            <option value="not_approved">Not Approved Pilots</option>
        </select>

      </div>
      
      {verificationButton && <p style={{ color: "#FF9900", marginTop: 0 }}>* Verification status is shown next to each pilot.</p>}
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPilots.length === 0 ? (
            <li>No pilots match the current filter criteria.</li>
        ) : (
            filteredPilots.map((pilot) => (
                <li
                    key={pilot._id}
                    style={{
                        padding: "0.5rem 0",
                        borderBottom: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span>
                        {pilot.name} - {pilot.email} - <strong>{pilot.role}</strong>
                        <span style={{ marginLeft: "0.5rem", fontWeight: "bold", color: pilot.isApproved ? "green" : "red" }}>
                            ({pilot.isApproved ? "Approved" : "Not Approved"})
                        </span>
                        
                        {verificationButton && (
                            <button
                                onClick={() => setSelectedPilotId(pilot._id)}
                                style={{
                                    marginLeft: "1rem",
                                    padding: "0.25rem 0.5rem",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    backgroundColor: "#28a745",
                                    color: "white",
                                }}
                            >
                                Verify Pilot
                            </button>
                        )}
                    </span>
                </li>
            ))
        )}
      </ul>
      
        {selectedPilotId && (
        <PilotModal
          pilotId={selectedPilotId}
          onClose={() => setSelectedPilotId(null)}
          onDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
};

export default PilotUsers;