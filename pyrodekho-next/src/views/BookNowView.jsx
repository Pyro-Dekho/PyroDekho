"use client";

import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function BookNowView() {
  // Coming from a product page? Pre-fill the message
  const productTitle = useSearchParams().get("product");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: productTitle
      ? `I'm interested in "${productTitle}". `
      : "",
  });

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
      await axios.post(`${API}/Eventenquiry`, form);

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
  );
}

export default BookNowView;
