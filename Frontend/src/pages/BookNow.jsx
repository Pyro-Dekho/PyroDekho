import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/book.css";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE_URL;

function BookNow() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  console.log(API)
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =====================
       VALIDATION
    ===================== */
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.eventType ||
      !form.eventDate
    ) {
      toast.error("Please fill in all required fields ❗");
      return;
    }

    // Phone validation (India)
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Please enter a valid phone number 📞");
      return;
    }

    // Event date validation (no past dates)
    const today = new Date().toISOString().split("T")[0];
    if (form.eventDate < today) {
      toast.error("Event date cannot be in the past 📅");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting your enquiry...");

    try {
  const res = await axios.post(`${API}/Eventenquiry`, form);

  toast.success(
    "Thank you! 🎉 Our team will contact you shortly to discuss your event.",
    { id: toastId }
  );

  setForm({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });
} catch (error) {
  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Something went wrong. Please try again later ❌",
    { id: toastId }
  );
} finally {
  setLoading(false);
}

  };

  return (
    <>
      <Header />

      <section className="book-page">
        <div className="book-hero">
          <h1>Book Your Event</h1>
          <p>
            Let us make your celebration unforgettable with premium Cold Pyro
            effects
          </p>
        </div>

        <div className="book-container">
          {/* CONTACT INFO */}
          <div className="info-card">
            <h3>Get in Touch</h3>

            <div className="info-item">
              <FaPhoneAlt />
              <p>9718410923</p>
            </div>

            <div className="info-item">
              <FaWhatsapp />
              <p>9412660853</p>
            </div>

            <div className="info-item">
              <FaEnvelope />
              <p>pyrodekho@gmail.com</p>
            </div>
          </div>

          {/* FORM */}
          <div className="form-card">
            <h3>Send an Enquiry</h3>

            <form className="book-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name *"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                />
              </div>

              <div className="form-group">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  maxLength={10}
                />
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                >
                  <option value="">Event Type *</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Stage Show</option>
                  <option>Corporate Event</option>
                  <option>Club / DJ</option>
                </select>
              </div>

              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your event requirements..."
              />

              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Book Now"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default BookNow;
