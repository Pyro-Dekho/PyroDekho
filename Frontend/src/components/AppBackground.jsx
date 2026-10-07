import { useLocation } from "react-router-dom";
import "../styles/background.css";

// Routes that get the slightly stronger "hero" glow.
// Everything else uses the softer, content-friendly version.
const HERO_ROUTES = ["/", "/login", "/signup", "/forgot-password", "/reset-password", "/contact", "/book"];

function AppBackground() {
  const { pathname } = useLocation();
  const intensity = HERO_ROUTES.includes(pathname) ? "hero" : "soft";

  return <div className="app-bg" data-intensity={intensity} aria-hidden="true" />;
}

export default AppBackground;
