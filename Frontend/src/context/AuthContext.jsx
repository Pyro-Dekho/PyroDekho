import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext({
  isAuth: false,
  name: "",
  loading: true,
  refreshAuth: async () => {},
  logout: async () => {},
});

// Logged in = email/password token in localStorage OR Google cookie (via /auth/me)
export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    let tokenName = null;

    const token = localStorage.getItem("token");
    if (token) {
      try {
        tokenName = jwtDecode(token).name || "";
      } catch {
        localStorage.removeItem("token");
      }
    }

    try {
      const res = await axios.get(`${API}/auth/me`, { withCredentials: true });
      if (res.data.success) {
        setIsAuth(true);
        setName(res.data.user.name);
        setLoading(false);
        return;
      }
    } catch {
      // not logged in via cookie, fall through
    }

    setIsAuth(tokenName !== null);
    setName(tokenName || "");
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const logout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    } catch {
      console.log("Logout request failed");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuth(false);
    setName("");
  };

  return (
    <AuthContext.Provider value={{ isAuth, name, loading, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
