import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext({
  shouldRefresh: false,
  setShouldRefresh: (value: boolean) => {},
});

export const RefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={{ shouldRefresh, setShouldRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(RefreshContext);
