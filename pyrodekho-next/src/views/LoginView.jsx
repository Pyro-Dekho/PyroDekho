"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function LoginView() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

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
      const res = await axios.post(`${API}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const data = res.data;

      toast.success("Login successful 🎉 Welcome back!", {
        id: toastId,
      });

      // Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      await refreshAuth();

      router.replace(redirect);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again ❌",
        { id: toastId },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your account</p>

        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* 🔐 Password */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="primary-btn" onClick={loginNow} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          className="google-btn"
          type="button"
          onClick={() => {
            window.location.href = `${API}/auth/google`;
          }}
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="footer-text">
          Don’t have an account?{" "}
          <span onClick={() => router.push("/signup")}>Create one</span>
        </p>

        <p className="footer-text">
          <span onClick={() => router.push("/forgot-password")}>
            Forgot password?
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginView;
