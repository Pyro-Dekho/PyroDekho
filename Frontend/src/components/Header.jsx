import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import "../styles/Button.css";
import logo from "../assets/pyrodekhoLogo/pyrodekhologo.jpg";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { searchTerm, setSearchTerm, filters, toggleFilter, clearFilters } =
    useSearch();
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close the filter panel on outside click or page change
  useEffect(() => {
    const onClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setFilterOpen(false);
  }, [pathname]);

  // Category filter is only available on the Home page
  const showFilter = pathname === "/";
  const filterOptions = [
    ["mostSearched", "Most Searched"],
    ["smokeless", "Smokeless"],
    ["event", "Event"],
    ["club", "Club"],
    ["wedding", "Wedding"],
    ["stage", "Stage"],
    ["birthday", "Birthday"],
    ["fog", "Fog"],
  ];

  const searchPlaceholders = {
    "/": "Search fireworks, crackers, pyros...",
    "/indoor": "Search indoor pyro products...",
    "/outdoor": "Search outdoor pyro products...",
    "/crackers": "Search pyro effects, crackers...",
  };
  // Short placeholder on phones so it is not cut off
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const searchPlaceholder = searchPlaceholders[pathname];
  const placeholderText = isMobile ? "Search products..." : searchPlaceholder;

  const { isAuth, name, logout: authLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const logout = async () => {
    await authLogout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="PyroDekho" />
        <div>
          <div className="logo-text">PyroDekho</div>
          <div className="tagline">DIGITAL INDIA KA BHAROSA</div>
        </div>
      </div>

      {/* SEARCH (only on pages that have a product list) */}
      {searchPlaceholder && (
        <div className="header-search-group">
          <div className="header-search">
            <svg
              className="header-search-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder={placeholderText}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                type="button"
                className="header-search-clear"
                aria-label="Clear search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          {showFilter && (
            <div className="header-filter-wrap" ref={filterRef}>
              <button
                type="button"
                className={`header-filter ${filters.length ? "active" : ""}`}
                aria-haspopup="true"
                aria-expanded={filterOpen}
                onClick={() => setFilterOpen((open) => !open)}
              >
                Filter{filters.length > 0 && ` (${filters.length})`}
              </button>

              {filterOpen && (
                <div className="filter-panel">
                  {filterOptions.map(([value, label]) => (
                    <label className="filter-option" key={value}>
                      <input
                        type="checkbox"
                        checked={filters.includes(value)}
                        onChange={() => toggleFilter(value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}

                  {filters.length > 0 && (
                    <button
                      type="button"
                      className="filter-clear"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMenuOpen(true)}>
        ☰
      </div>

      {/* MENU / DRAWER */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>
          ✕
        </button>

        {isAuth ? (
          <>
            <div className="drawer-user">
              Hello, <strong>{name}</strong>
            </div>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/book");
                closeMenu();
              }}
            >
              Book Now
            </button>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/safety");
                closeMenu();
              }}
            >
              Safety
            </button>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/contact");
                closeMenu();
              }}
            >
              Contact
            </button>

            <button className="btn-filled logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-filled"
              onClick={() => {
                navigate("/book");
                closeMenu();
              }}
            >
              Book Now
            </button>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/safety");
                closeMenu();
              }}
            >
              Safety
            </button>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/contact");
                closeMenu();
              }}
            >
              Contact
            </button>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/signup");
                closeMenu();
              }}
            >
              Signup
            </button>

            <button
              className="btn-filled"
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
