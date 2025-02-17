import React, { createContext, useContext, useState } from 'react';

const SavedRefreshContext = createContext({
  shouldRefresh: false,
  setShouldRefresh: (value: boolean) => {},
});

export const SavedRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  return (
    <SavedRefreshContext.Provider value={{ shouldRefresh, setShouldRefresh }}>
      {children}
    </SavedRefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(SavedRefreshContext);
