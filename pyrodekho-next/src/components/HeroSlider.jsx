"use client";

import "@/styles/slider.css";
import Link from "next/link";
import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

const heroVideo = "/media/fireworks.mp4";
const heroPoster = "/media/hero-poster.jpeg";

function HeroSlider() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  // On phones the form is collapsed behind a button so the hero fits one screen
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    /* ======================
       FRONTEND VALIDATION
    ====================== */

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill in all required details ❗");
      return;
    }

    // Phone validation (India – 10 digits)
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Please enter a valid phone number 📞");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting your request...");

    try {
      await axios.post(`${API}/enquiry`, form);

      toast.success(
        "Thank you! 🎉 Our team will contact you shortly with the best price.",
        { id: toastId }
      );

      setForm({
        name: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong. Please try again.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  // Scroll just past the hero to reveal the products
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight - 72, behavior: "smooth" });
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroPoster})` }}
    >
      <video
        className="hero-video"
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="hero-overlay">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <span className="hero-badge">Imported Cold Pyro</span>

          <h1>
            Light Up Every <br />
            <span>Celebration</span>
          </h1>

          <p className="hero-sub">
            Safe • Smokeless • Delivered All India
          </p>

          <div className="hero-buttons">
            <Link href="/indoor" className="hero-btn hero-btn-primary">
              Indoor
            </Link>
            <Link href="/outdoor" className="hero-btn hero-btn-primary">
              Outdoor
            </Link>
            <Link href="/eventParties" className="hero-btn hero-btn-ghost">
              Event Parties
            </Link>
            <Link href="/crackers" className="hero-btn hero-btn-ghost">
              Crackers
            </Link>
          </div>
        </div>

        {/* MOBILE: button that reveals the form */}
        <button
          type="button"
          className="hero-cta-mobile"
          onClick={() => setShowForm((open) => !open)}
        >
          {showForm ? "Close" : "Get Best Price"}
        </button>

        {/* RIGHT FORM */}
        <form
          className={`hero-form ${showForm ? "open" : ""}`}
          onSubmit={SubmitHandler}
        >
          <h3>Get Best Price</h3>
          <p className="hero-form-sub">
            Share your details and we will call you back with the best quote.
          </p>

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
          />

          <textarea
            placeholder="Your Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Get Best Price"}
          </button>

          <small className="hero-form-note">
            No spam. Free consultation.
          </small>
        </form>
      </div>

      <button
        type="button"
        className="hero-scroll"
        onClick={scrollDown}
        aria-label="Scroll to products"
      >
        <span>Explore products</span>
        <i aria-hidden="true">⌄</i>
      </button>
    </section>
  );
}

export default HeroSlider;
