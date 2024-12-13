import React, { createContext, useContext, useState, useCallback } from 'react';

// Context to manage the most recently updated project ID
const ProjectUpdateContext = createContext<any>(null);

export const ProjectUpdateProvider = ({ children }: any) => {
  const [updatedProjectID, setUpdatedProjectID] = useState<string | null>(null);

  // Function to update the most recently updated project ID
  const setProjectID = useCallback((projectID: string) => {
    setUpdatedProjectID(projectID);
  }, []);

  return (
    <ProjectUpdateContext.Provider value={{ updatedProjectID, setProjectID }}>
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
