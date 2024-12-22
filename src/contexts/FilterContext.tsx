import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the filter context
type Filter = {
  sortBy: string;
  distance: string | number;
};

type FilterContextType = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  onFilterApply?: () => void;
  setOnFilterApply: React.Dispatch<React.SetStateAction<() => void>>;
};

// Provide a default value for the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({
    sortBy: 'newest',
    distance: '100+',
  });

  const [onFilterApply, setOnFilterApply] = useState<() => void>(() => {});

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        onFilterApply,
        setOnFilterApply,
      }}
    >
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
