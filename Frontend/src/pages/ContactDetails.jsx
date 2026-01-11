import Header from "../components/Header";
import "../styles/contact.css";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function ContactDetails() {
  
  return (
    <>
    <Header/>
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We’re here to help you with Cold Pyro products & support
      </p>

      <div className="contact-card">
        <div className="contact-item">
          <FaPhoneAlt className="icon phone" />
          <div>
            <h3>Call Us</h3>
            <p>9718410923</p>
          </div>
        </div>

        <div className="contact-item">
          <FaWhatsapp className="icon whatsapp" />
          <div>
            <h3>WhatsApp</h3>
            <p>9412660853</p>
          </div>
        </div>

        <div className="contact-item">      
          <FaEnvelope className="icon email" />
          <div>
            <h3>Email</h3>
            <p>pyrodekho@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactDetails;
