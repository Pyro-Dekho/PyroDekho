import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "../styles/slider.css";
import "../styles/Button.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Image1 from "../assets/sliderImage/Image1.jpeg";
import Image2 from "../assets/sliderImage/Image2.jpeg";
import Image3 from "../assets/sliderImage/Image3.jpeg";
import Image4 from "../assets/sliderImage/Image4.jpeg";
import Image5 from "../assets/sliderImage/Image5.jpeg";
import Image6 from "../assets/sliderImage/Image6.jpeg";

import axios from "axios";
import toast from "react-hot-toast";

function HeroSlider() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

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
      await axios.post("http://localhost:5000/api/enquiry", form);

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

  const slides = [Image1, Image2, Image3, Image4, Image5, Image6];

  return (
    <div className="hero-container">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="hero-swiper"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="hero-overlay">

                {/* LEFT FORM */}
                <form className="hero-form" onSubmit={SubmitHandler}>
                  <h3>Get Best Price</h3>

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
                    {loading ? "Submitting..." : "Submit Details"}
                  </button>
                </form>

                {/* RIGHT CONTENT */}
                <div className="hero-content">
                  <h1>
                    Buy Imported <br />
                    Indoor / Outdoor Cold <br />
                    Pyro
                  </h1>

                  <p>Select Indoor or Outdoor Pyro</p>

                  <div className="hero-buttons">
                    <button onClick={() => navigate("/indoor")} className="btn-filled">
                      Indoor
                    </button>
                    <button onClick={() => navigate("/outdoor")} className="btn-filled">
                      Outdoor
                    </button>
                    <button onClick={() => navigate("/eventParties")} className="btn-filled">
                      Event Parties
                    </button>
                    <button onClick={() => navigate("/crackers")} className="btn-filled">
                      Crackers
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;
