import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context's type
type ProgressContextType = {
  isVisible: boolean;
  progress: number;
  setProgress: (value: number) => void;
  showProgressBar: () => void;
  hideProgressBar: () => void;
  updateProgress: (value: number) => void;
};

// Create the context with the defined type
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Export a custom hook for accessing the context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

// Context provider
export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const showProgressBar = () => {
    console.log("Showing progress bar");
    setIsVisible(true);
  };

  const hideProgressBar = () => {
    console.log("Hiding progress bar");  // Add this log
    setIsVisible(false);
  };
  const updateProgress = (value: any) => setProgress(value);

  return (
    <ProgressContext.Provider
      value={{
        isVisible,
        progress,
        setProgress,
        showProgressBar,
        hideProgressBar,
        updateProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};