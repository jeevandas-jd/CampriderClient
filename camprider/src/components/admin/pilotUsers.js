import React, { useEffect, useState, useMemo } from "react";
import { getAllPilots } from "../../api/admin/adminClient";
import PilotModal from "../../modal/admin/pilotModal";
import BenchManager from "./benchManager";
import { Bike, Shield, CheckCircle, XCircle, Filter, Eye, Settings, Loader } from "lucide-react";
import "./style/PilotUsers.css";

const PilotUsers = () => {
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationButton, setVerificationButton] = useState(false);
  const [selectedPilotId, setSelectedPilotId] = useState(null);
  const [Ids, setIDs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBenchManager, setShowBenchManager] = useState(false);

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await getAllPilots();
        const pilotIds = response.data.map(pilot => pilot._id);
        setIDs(pilotIds);
        console.log("pilot Ids", pilotIds);
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

  const handleBenchSettings = () => {
    setShowBenchManager(true);
  };

  const filteredPilots = useMemo(() => {
    if (filterStatus === 'all') {
      return pilots;
    }
    
    const isApprovedFilter = filterStatus === 'approved';
    return pilots.filter(pilot => pilot.isApproved === isApprovedFilter);
  }, [pilots, filterStatus]);

  if (loading) {
    return (
      <div className="pilots-loading">
        <Loader className="loading-spinner" size={32} />
        <p>Loading pilots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pilots-error">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Pilots</h3>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pilots-container">
      {/* Header */}
      <div className="pilots-header">
        <div className="header-content">
          <Bike size={24} />
          <h2>Pilot Management</h2>
          <span className="pilots-count">{filteredPilots.length} pilots</span>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="controls-left">
          <button 
            onClick={handleVerificationToggle}
            className={`control-btn ${verificationButton ? 'active' : ''}`}
          >
            <Shield size={16} />
            {verificationButton ? "Hide Verification" : "Show Verification"}
          </button>
          
          <button 
            onClick={handleBenchSettings}
            className="control-btn secondary"
          >
            <Settings size={16} />
            Bench Settings
          </button>
        </div>

        <div className="filter-control">
          <Filter size={16} />
          <label htmlFor="approved-filter">Filter by Approval:</label>
          <select 
            id="approved-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Pilots</option>
            <option value="approved">Approved Only</option>
            <option value="not_approved">Pending Approval</option>
          </select>
        </div>
      </div>

      {verificationButton && (
        <div className="verification-notice">
          <Shield size={16} />
          <span>Verification status is shown for each pilot</span>
        </div>
      )}

      {/* Pilots List */}
      {filteredPilots.length === 0 ? (
        <div className="empty-state">
          <Bike size={48} className="empty-icon" />
          <h3>No Pilots Found</h3>
          <p>No pilots match the current filter criteria.</p>
        </div>
      ) : (
        <div className="pilots-table-container">
          <div className="pilots-table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-cell pilot-info">Pilot Information</div>
                <div className="table-cell status">Status</div>
                <div className="table-cell actions">Actions</div>
              </div>
            </div>
            
            <div className="table-body">
              {filteredPilots.map((pilot) => (
                <div key={pilot._id} className="table-row pilot-row">
                  <div className="table-cell pilot-info">
                    <div className="pilot-avatar">
                      {pilot.name ? pilot.name.charAt(0).toUpperCase() : "P"}
                    </div>
                    <div className="pilot-details">
                      <div className="pilot-name">{pilot.name || "No Name"}</div>
                      <div className="pilot-email">{pilot.email}</div>
                      {pilot.vehicleType && (
                        <div className="pilot-vehicle">{pilot.vehicleType}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="table-cell status">
                    <div className={`verification-badge ${pilot.isApproved ? 'approved' : 'pending'}`}>
                      {pilot.isApproved ? (
                        <>
                          <CheckCircle size={14} />
                          Approved
                        </>
                      ) : (
                        <>
                          <XCircle size={14} />
                          Pending
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="table-cell actions">
                    <button
                      onClick={() => setSelectedPilotId(pilot._id)}
                      className="action-btn view-btn"
                      title="View Pilot Details"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                    
                    {verificationButton && !pilot.isApproved && (
                      <button
                        onClick={() => setSelectedPilotId(pilot._id)}
                        className="action-btn verify-btn"
                        title="Verify Pilot"
                      >
                        <Shield size={16} />
                        <span>Verify</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedPilotId && (
        <PilotModal
          pilotId={selectedPilotId}
          onClose={() => setSelectedPilotId(null)}
          onDeleted={handleUserDeleted}
        />
      )}

      {showBenchManager && (
        <BenchManager 
          userIDs={Ids}
          onClose={() => setShowBenchManager(false)}
        />
      )}
    </div>
  );
};

export default PilotUsers;