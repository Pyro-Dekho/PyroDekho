import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";
import axios from "axios";

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
      const res = await axios.post(
        `${API}/auth/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      const data = res.data;

      toast.success("Login successful 🎉 Welcome back!", {
        id: toastId,
      });

      // Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);

      navigate(redirect, { replace: true });
    } catch (error) {
     
      toast.error(       
        error.response?.data?.message ||
          "Something went wrong. Please try again ❌",
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

          {/* 🔐 Password */}
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
