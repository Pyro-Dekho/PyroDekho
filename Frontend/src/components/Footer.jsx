import { useNavigate } from "react-router-dom";
import "../styles/footer.css";
import toast from "react-hot-toast";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-col">
          <h3 className="footer-title">PyroDekho</h3>
          <p>Buy Imported Cold Pyro</p>
          <p className="footer-small">
            Trusted platform for indoor & outdoor cold pyro solutions.
          </p>
        </div>

        {/* CONNECT */}
        <div className="footer-col">
          <h4>Connect With Us</h4>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/share/1Fy6wWK921/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/pyrodekho_digital_company?igsh=MTUzOWZsZGQ0OGJhdg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://youtube.com/@pyrodekho?si=L4EC571tFKZTsM4R"
              target="_blank"
              rel="noopener noreferrer"
            >
              You Tube
            </a>
            <a
              href="https://www.linkedin.com/in/pyro-dekho-3560633a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedln
            </a>
            
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li
              onClick={() => {
                navigate("/indoor");
              }}
            >
              Indoor Cold Pyro
            </li>
            <li
              onClick={() => {
                navigate("/outdoor");
              }}
            >
              Outdoor Cold Pyro
            </li>
            <li
              onClick={() => {
                navigate("/eventParties");
              }}
            >
              Event Parties
            </li>
            <li
              onClick={() => {
                navigate("/eventParties");
              }}
            >
              Stage Shows
            </li>
            <li
              onClick={() => {
                navigate("/book");
              }}
            >
              Wedding Booking
            </li>
          </ul>
        </div>

        {/* ABOUT */}
        <div className="footer-col">
          <h4
            className="cursor-pointer "
            onClick={() => {
              navigate("/about");
            }}
          >
            About Us
          </h4>
          <ul>
            <li
              className="cursor-pointer "
              onClick={() => {
                navigate("/company");
              }}
            >
              Company
            </li>
            <li
              className="cursor-pointer "
              onClick={() => {
                navigate("/safety");
              }}
            >
              Safety
            </li>
            <li
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact
            </li>
            <li
              onClick={() => {
                navigate("/how-it-works");
              }}
            >
              How it works
            </li>
          </ul>
        </div>

        {/* TERMS */}
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li onClick={() => navigate("/terms")}>Terms & Conditions</li>
            <li onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
            <li onClick={() => navigate("/about")}>Mission & Vision</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © 2026 PyroDekho.com — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
