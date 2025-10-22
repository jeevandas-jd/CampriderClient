

import { useState } from "react";


const TripInfos = ({ tripData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!tripData) {
    return <p>No active trip.</p>;
  }

  return (
    <div className="trip-infos-container">
      <h2>Trip Information</h2>
      <p><strong>Trip ID:</strong> {tripData.tripId}</p>
      <p><strong>Status:</strong> {tripData.status}</p>
      <p><strong>Origin:</strong> {tripData.origin}</p>
      <p><strong>Destination:</strong> {tripData.destination}</p>
      
      {isExpanded && (
        <div className="trip-details">
          <p><strong>Driver:</strong> {tripData.driverName}</p>
          <p><strong>Vehicle:</strong> {tripData.vehicleInfo}</p>
          <p><strong>Fare:</strong> ${tripData.fare}</p>
          <p><strong>Estimated Time:</strong> {tripData.estimatedTime} mins</p>
        </div>
      )}

      <button onClick={toggleExpand} className="trip-toggle-btn">
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default TripInfos;