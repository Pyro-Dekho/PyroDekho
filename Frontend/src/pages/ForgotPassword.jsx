import { useState } from "react";
import toast from "react-hot-toast";
import "../styles/login.css";
import Header from "../components/Header";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendLink = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address ❗");
      return;
    }

    // basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address 📧");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending reset link...");

    try {
      const res = await axios.post(
        `${API}/auth/forgot-password`,
        { email }
      );

      const data = res.data;

      toast.success(
        data.message ||
          "Password reset link sent successfully 📩 Please check your email.",
        { id: toastId }
      );

      setEmail("");
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
          <h2>Forgot Password</h2>
          <p className="login-subtitle">
            Enter your registered email and we’ll send you a password reset link.
          </p>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={sendLink}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
