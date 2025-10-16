import React, { useEffect, useState } from "react";
import { getPilotById, verifyPilot } from "../../api/admin/adminClient";
import { X, User, Mail, IdCard, Shield, CheckCircle, AlertCircle, Clock, Car, Hash, Building } from "lucide-react";
import "./style/PilotModal.css";

const PilotModal = ({ pilotId, onClose, onDeleted }) => {
    const [pilot, setPilot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        if (!pilotId) {
            setPilot(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setPilot(null);

        const fetchPilot = async () => {
            try {
                const res = await getPilotById(pilotId);
                setPilot(res.data);
            } catch (err) {
                console.error("Error fetching pilot:", err);
                setError(err.response?.data?.message || "Failed to fetch pilot details");
            } finally {
                setLoading(false);
            }
        };
        
        fetchPilot();
    }, [pilotId]);

    const handleVerify = async () => {
        if (!window.confirm("Are you sure you want to verify this pilot? This action cannot be undone.")) return;

        setVerifying(true);
        try {
            await verifyPilot(pilotId);
            alert("Pilot verified successfully!");
            onClose();
            if (onDeleted) onDeleted(pilotId);
        } catch (err) {
            console.error("Error verifying pilot:", err);
            alert(err.response?.data?.message || "Failed to verify pilot");
        } finally {
            setVerifying(false);
        }
    };

    const getStatusBadge = (isVerified) => {
        return isVerified ? (
            <div className="status-badge verified">
                <CheckCircle size={14} />
                Verified
            </div>
        ) : (
            <div className="status-badge pending">
                <Clock size={14} />
                Pending Verification
            </div>
        );
    };

    return (
        <div className="pilot-modal-overlay" onClick={onClose}>
            <div className="pilot-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div className="header-title">
                        <User size={24} />
                        <h2>Pilot Details</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="modal-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading pilot details...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="modal-error">
                        <AlertCircle size={32} />
                        <h3>Error Loading Pilot</h3>
                        <p>{error}</p>
                        <button className="retry-btn" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                )}

                {/* Pilot Details */}
                {pilot && !loading && (
                    <div className="pilot-details">
                        {/* Profile Section */}
                        <div className="detail-section">
                            <h3 className="section-title">Profile Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <User size={16} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Full Name</label>
                                        <p>{pilot.name || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <Mail size={16} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Email Address</label>
                                        <p>{pilot.email}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <Building size={16} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Department</label>
                                        <p>{pilot.department || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <IdCard size={16} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Student ID</label>
                                        <p>{pilot.studentID || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Information */}
                        <div className="detail-section">
                            <h3 className="section-title">Vehicle Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <Car size={16} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Vehicle Type</label>
                                        <p>{pilot.vehicleType || "Not specified"}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <Hash size={16} />
                                    </div>
                                    <div className="detail-content">
                                        <label>Vehicle Number</label>
                                        <p>{pilot.vehicleNumber || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verification Status */}
                        <div className="detail-section">
                            <h3 className="section-title">Verification Status</h3>
                            <div className="verification-info">
                                {getStatusBadge(pilot.isVerified)}
                                {pilot.licenseNumber && (
                                    <div className="detail-item">
                                        <div className="detail-icon">
                                            <Shield size={16} />
                                        </div>
                                        <div className="detail-content">
                                            <label>License Number</label>
                                            <p>{pilot.licenseNumber}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="modal-actions">
                            {!pilot.isVerified && (
                                <button 
                                    className="action-btn verify-btn"
                                    onClick={handleVerify}
                                    disabled={verifying}
                                >
                                    {verifying ? (
                                        <div className="loading-spinner-small"></div>
                                    ) : (
                                        <>
                                            <CheckCircle size={16} />
                                            Verify Pilot
                                        </>
                                    )}
                                </button>
                            )}
                            <button 
                                className="action-btn close-action-btn"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!pilot && !loading && !error && (
                    <div className="modal-empty">
                        <User size={48} />
                        <h3>No Pilot Data</h3>
                        <p>No pilot information available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PilotModal;