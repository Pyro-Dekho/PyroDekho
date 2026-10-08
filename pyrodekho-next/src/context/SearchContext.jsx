"use client";

import { createContext, useCallback, useContext, useState } from "react";

const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
  filters: [],
  toggleFilter: () => {},
  clearFilters: () => {},
  resetSearch: () => {},
});

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);

  // Selecting a category clears the search box
  const toggleFilter = (value) => {
    setSearchTerm("");
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const clearFilters = () => setFilters([]);

  // Called by the Header when a page mounts, so each page starts clean
  const resetSearch = useCallback(() => {
    setSearchTerm("");
    setFilters([]);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filters,
        toggleFilter,
        clearFilters,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
