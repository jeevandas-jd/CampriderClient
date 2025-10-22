
import TripModal from "../../modal/tripModal/trip";

import { useState,useEffect } from "react";

const TripConsole = ({ tripId, pickupLocation, dropLocation, fare, onClose, status, pilotId }) => {
    // Helper function to format fare for display
    const formatFare = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Determine color based on status for the badge
    const statusColor = status === 'ACCEPTED' ? 'bg-green-500' : 'bg-blue-500';

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-lg mx-auto transform transition duration-300 hover:shadow-2xl border-t-4 border-indigo-600">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">
                    Active Trip Console
                </h2>
                <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColor} shadow-md`}>
                    {status || 'ACTIVE'}
                </span>
            </div>

            <div className="space-y-4">
                {/* Trip ID */}
                <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-gray-500">Trip ID:</span>
                    <span className="text-sm font-mono text-indigo-700 break-all">{tripId}</span>
                </div>

                {/* Pilot ID (Optional if used for verification) */}
                <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-medium text-gray-500">Pilot ID:</span>
                    <span className="text-sm font-mono text-gray-700 break-all">{pilotId}</span>
                </div>
                
                {/* Pickup Location */}
                <div className="border-l-4 border-green-500 pl-4 py-1 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold">PICKUP</p>
                    <p className="text-lg font-semibold text-gray-800">{pickupLocation}</p>
                </div>

                {/* Drop Location */}
                <div className="border-l-4 border-red-500 pl-4 py-1 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600 font-semibold">DROP-OFF</p>
                    <p className="text-lg font-semibold text-gray-800">{dropLocation}</p>
                </div>

                {/* Fare */}
                <div className="text-center pt-4">
                    <p className="text-sm font-medium text-gray-500">ESTIMATED FARE</p>
                    <p className="text-4xl font-black text-indigo-600">
                        {formatFare(fare)}
                    </p>
                </div>
            </div>

            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition duration-150 shadow-lg shadow-indigo-300/50"
                >
                    Acknowledge & Continue
                </button>
            )}
        </div>
    );
};

export default TripConsole;