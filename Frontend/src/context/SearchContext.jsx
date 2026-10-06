import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
  filters: [],
  toggleFilter: () => {},
  clearFilters: () => {},
});

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const { pathname } = useLocation();

  // Each page starts with a clean search and filter
  useEffect(() => {
    setSearchTerm("");
    setFilters([]);
  }, [pathname]);

  // Selecting a category clears the search box
  const toggleFilter = (value) => {
    setSearchTerm("");
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const clearFilters = () => setFilters([]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filters,
        toggleFilter,
        clearFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
