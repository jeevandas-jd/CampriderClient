import React, { createContext, useContext, useState, useEffect } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState(() => {
    // Load from localStorage on page reload
    const savedTrip = localStorage.getItem("currentTrip");
    return savedTrip ? JSON.parse(savedTrip) : null;
  });

  useEffect(() => {
    // Save whenever currentTrip changes
    if (currentTrip) {
      localStorage.setItem("currentTrip", JSON.stringify(currentTrip));
    } else {
      localStorage.removeItem("currentTrip");
    }
  }, [currentTrip]);

  return (
    <TripContext.Provider value={{ currentTrip, setCurrentTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
