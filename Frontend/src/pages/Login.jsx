import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const redirect = query.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginNow = async () => {
    /* =====================
       VALIDATION
    ===================== */
    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Please enter both email and password ❗");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging you in...");

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid login credentials");
      }

      toast.success("Login successful 🎉 Welcome back!", {
        id: toastId,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);

      navigate(redirect, { replace: true });
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again ❌",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="login-page">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* 🔐 Password with eye icon */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* ✅ Button with loading */}
          <button
            className="primary-btn"
            onClick={loginNow}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="footer-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Create one
            </span>
          </p>

          <p className="footer-text">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
