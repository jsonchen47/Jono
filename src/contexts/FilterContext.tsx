import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the filter context
type Filter = {
  sortBy: string; // Add more fields if necessary
};

type FilterContextType = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

// Provide a default value for the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({
    sortBy: 'newest', // Default value for sorting
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }

  return context;
};