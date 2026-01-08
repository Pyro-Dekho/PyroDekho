import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signupFinal.css";
import toast from "react-hot-toast";
import Header from "../components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const finishSignup = async () => {
    /* =====================
       VALIDATION
    ===================== */
    if (!name || !phone || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields ❗");
      return;
    }

    // Phone (India)
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid mobile number 📞");
      return;
    }

    // Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address 📧");
      return;
    }

    // Password strength
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters 🔒");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, phone, password, address }
      );

      toast.success(
        "Account created successfully 🎉 Please login to continue.",
        { id: toastId }
      );

      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(
          "Account already exists. Please login instead 🔐",
          { id: toastId }
        );
        navigate("/login");
      } else {
        toast.error(
          "Signup failed. Please try again ❌",
          { id: toastId }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="signup-page">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p className="subtitle">
            Complete your signup to continue
          </p>

          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mobile Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />

          <input
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* 🔐 Password */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* 🔐 Confirm Password */}
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            className="primary-btn"
            onClick={finishSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="footer-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
