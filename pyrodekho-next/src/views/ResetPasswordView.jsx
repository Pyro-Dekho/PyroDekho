"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function ResetPasswordView() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetNow = async () => {
    if (!password || !confirm) {
      toast.error("Please fill in both password fields ❗");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (!token) {
      toast.error("Invalid or expired reset link ❌");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Resetting your password...");

    try {
      const res = await axios.post(
        `${API}/auth/reset-password`,
        {
          token,
          password,
          confirm,
        }
      );

      const data = res.data;

      toast.success(
        data.message ||
          "Password reset successful 🎉 Please login with your new password.",
        { id: toastId }
      );

      router.push("/login");
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
    <div className="login-page">
      <div className="login-card">
        <h1>Reset Password</h1>
        <p className="login-subtitle">
          Enter a new password for your account
        </p>

        {/* 🔐 New password */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* 🔐 Confirm new password */}
        <div className="password-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <span
            className="eye-icon"
            role="button"
            aria-label={showConfirm ? "Hide password" : "Show password"}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          className="primary-btn"
          onClick={resetNow}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordView;
