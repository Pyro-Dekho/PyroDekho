import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/contact.css";

const CONTACTS = [
  {
    key: "phone",
    Icon: FaPhoneAlt,
    title: "Call Us",
    value: "9718410923",
    action: "Call now",
    href: "tel:+919718410923",
  },
  {
    key: "whatsapp",
    Icon: FaWhatsapp,
    title: "WhatsApp",
    value: "9412660853",
    action: "Chat on WhatsApp",
    href: "https://wa.me/919412660853",
    external: true,
  },
  {
    key: "email",
    Icon: FaEnvelope,
    title: "Email",
    value: "pyrodekho@gmail.com",
    action: "Send an email",
    href: "mailto:pyrodekho@gmail.com",
  },
];

function ContactDetails() {
  return (
    <>
      <Header />
      <main className="ct-page">
        {/* HERO */}
        <section className="ct-hero">
          <span className="ct-eyebrow">Get in touch</span>
          <h1>
            Contact <span>Us</span>
          </h1>
          <p>We’re here to help you with Cold Pyro products &amp; support.</p>
        </section>

        {/* CONTACT CARDS */}
        <section className="ct-cards">
          {CONTACTS.map(({ key, Icon, title, value, action, href, external }) => (
            <a
              key={key}
              href={href}
              className={`ct-card ct-${key}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="ct-icon" aria-hidden="true">
                <Icon />
              </span>
              <h2>{title}</h2>
              <p className="ct-value">{value}</p>
              <span className="ct-action">
                {action} <FaArrowRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </section>

        {/* CTA */}
        <section className="ct-wrap">
          <div className="ct-cta">
            <h2>Planning an event?</h2>
            <p>
              Tell us your date and venue, and our team will guide you to the
              right Cold Pyro effects.
            </p>
            <div className="ct-actions">
              <Link to="/book" className="ct-btn ct-btn-primary">Book Now</Link>
              <Link to="/how-it-works" className="ct-btn ct-btn-ghost">How it works</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactDetails;
