"use client";

import { usePathname } from "next/navigation";
import "@/styles/background.css";

// Routes that get the slightly stronger "hero" glow.
// Everything else uses the softer, content-friendly version.
const HERO_ROUTES = ["/", "/login", "/signup", "/forgot-password", "/reset-password", "/contact", "/book"];

export function BackgroundLayer({ intensity }) {
  return <div className="app-bg" data-intensity={intensity} aria-hidden="true" />;
}

function AppBackground() {
  const pathname = usePathname();
  const intensity = HERO_ROUTES.includes(pathname) ? "hero" : "soft";

  return <BackgroundLayer intensity={intensity} />;
}

export default AppBackground;
