import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/header.css";
import "../styles/Button.css";
import logo from "../assets/pyrodekhoLogo/pyrodekhologo.jpg";

function Header() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuth(true);
        setName(decoded.name);
      } catch {
        setIsAuth(false);
      }
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
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

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMenuOpen(true)}>
        ☰
      </div>

      {/* MENU / DRAWER */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>✕</button>

        {isAuth ? (
          <>
            <div className="drawer-user">Hello, <strong>{name}</strong></div>

            <button className="btn-filled" onClick={() => { navigate("/book"); closeMenu(); }}>
              Book Now
            </button>

            <button className="btn-filled" onClick={() => { navigate("/safety"); closeMenu(); }}>
              Safety
            </button>

            <button className="btn-filled" onClick={() => { navigate("/contact"); closeMenu(); }}>
              Contact
            </button>

            <button className="btn-filled logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn-filled" onClick={() => { navigate("/book"); closeMenu(); }}>
              Book Now
            </button>

            <button className="btn-filled" onClick={() => { navigate("/safety"); closeMenu(); }}>
              Safety
            </button>

            <button className="btn-filled" onClick={() => { navigate("/contact"); closeMenu(); }}>
              Contact
            </button>

            <button className="btn-filled" onClick={() => { navigate("/signup"); closeMenu(); }}>
              Signup
            </button>

            <button className="btn-filled" onClick={() => { navigate("/login"); closeMenu(); }}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
