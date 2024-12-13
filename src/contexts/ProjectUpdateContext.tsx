import React, { createContext, useContext, useState, useCallback } from 'react';

// Context to manage the most recently updated project ID and update flag
const ProjectUpdateContext = createContext<any>(null);

export const ProjectUpdateProvider = ({ children }: any) => {
  const [updatedProjectID, setUpdatedProjectID] = useState<string | null>(null);
  const [updated, setUpdated] = useState<boolean>(false); // New state to track update status

  // Function to set the most recently updated project ID and the updated flag
  const setProjectID = useCallback((projectID: string) => {
    setUpdatedProjectID(projectID);
    setUpdated(true); // Set the updated flag to true

    // Reset the updated flag after a short delay (e.g., 1 second)
    setTimeout(() => {
      setUpdated(false); // Reset the updated flag after 1 second
    }, 100);
  }, []);

  return (
    <ProjectUpdateContext.Provider value={{ updatedProjectID, updated, setProjectID }}>
      {children}
    </ProjectUpdateContext.Provider>
  );
};

export const useProjectUpdateContext = () => {
  const context = useContext(ProjectUpdateContext);
  if (!context) {
    throw new Error("useProjectUpdateContext must be used within a ProjectUpdateProvider");
  }
  return context;
};
