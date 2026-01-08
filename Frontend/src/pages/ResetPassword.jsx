import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/login.css";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_BASE_URL;

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const resetNow = async () => {
    /* =====================
       VALIDATION
    ===================== */
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
      const res = await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      toast.success(
        "Password reset successful 🎉 Please login with your new password.",
        { id: toastId }
      );

      navigate("/login");
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
      <Header/>
      <div className="login-page">
      <div className="login-card">
        <h2>Reset Password</h2>
        <p className="login-subtitle">
          Enter a new password for your account
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={resetNow}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
    </>
  );
}

export default ResetPassword;
