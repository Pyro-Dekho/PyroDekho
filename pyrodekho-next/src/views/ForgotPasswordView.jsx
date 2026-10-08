"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEnvelope, FaLock, FaArrowLeft, FaCheck } from "react-icons/fa";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const sendLink = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      toast.error("Please enter your email address ❗");
      return;
    }

    // basic email validation
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      toast.error("Please enter a valid email address 📧");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending reset link...");

    try {
      const res = await axios.post(`${API}/auth/forgot-password`, {
        email: value,
      });

      toast.success(
        res.data.message ||
          "Password reset link sent successfully 📩 Please check your email.",
        { id: toastId }
      );

      setSentTo(value);
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
    <main className="fp-page">
      <div className="fp-card">
        {sentTo ? (
          <div className="fp-success">
            <span className="fp-badge fp-badge-ok" aria-hidden="true">
              <FaCheck />
            </span>
            <h1>Check your email</h1>
            <p className="fp-sub">
              We’ve sent a password reset link to{" "}
              <strong>{sentTo}</strong>. It may take a minute to arrive.
            </p>
            <p className="fp-hint">
              Can’t find it? Check your spam folder, or try again.
            </p>
            <button
              type="button"
              className="fp-btn fp-btn-ghost"
              onClick={() => setSentTo("")}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={sendLink} noValidate>
            <span className="fp-badge" aria-hidden="true">
              <FaLock />
            </span>
            <h1>Forgot Password?</h1>
            <p className="fp-sub">
              No worries. Enter your registered email and we’ll send you a
              password reset link.
            </p>

            <label className="fp-label" htmlFor="fp-email">
              Email address
            </label>
            <div className="fp-field">
              <FaEnvelope aria-hidden="true" />
              <input
                id="fp-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="fp-btn fp-btn-primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <Link href="/login" className="fp-back">
          <FaArrowLeft aria-hidden="true" /> Back to login
        </Link>
      </div>
    </main>
  );
}

export default ForgotPasswordView;
