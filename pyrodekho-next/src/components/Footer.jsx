import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const SOCIALS = [
  {
    label: "Facebook",
    Icon: FaFacebookF,
    href: "https://www.facebook.com/share/1Fy6wWK921/",
  },
  {
    label: "Instagram",
    Icon: FaInstagram,
    href: "https://www.instagram.com/pyrodekho_digital_company?igsh=MTUzOWZsZGQ0OGJhdg==",
  },
  {
    label: "YouTube",
    Icon: FaYoutube,
    href: "https://youtube.com/@pyrodekho?si=L4EC571tFKZTsM4R",
  },
  {
    label: "LinkedIn",
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/pyro-dekho-3560633a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

const PRODUCT_LINKS = [
  { label: "Indoor Cold Pyro", to: "/indoor" },
  { label: "Outdoor Cold Pyro", to: "/outdoor" },
  { label: "Event Parties", to: "/eventParties" },
  { label: "Stage Shows", to: "/eventParties" },
  { label: "Wedding Booking", to: "/book" },
];

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Company", to: "/company" },
  { label: "Safety", to: "/safety" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Contact", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Mission & Vision", to: "/about" },
];

function LinkColumn({ title, links }) {
  return (
    <nav className="ft-col" aria-label={title}>
      <h4>{title}</h4>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.to}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="ft">
      <div className="ft-container">
        {/* BRAND + CONTACT */}
        <div className="ft-col ft-brand">
          <h3 className="ft-title">
            Pyro<span>Dekho</span>
          </h3>
          <p className="ft-tagline">Buy Imported Cold Pyro</p>
          <p className="ft-small">
            Trusted platform for indoor &amp; outdoor cold pyro solutions.
          </p>

          <ul className="ft-contact">
            <li>
              <a href="tel:+919718410923">
                <FaPhoneAlt aria-hidden="true" /> 9718410923
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919412660853"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> 9412660853
              </a>
            </li>
            <li>
              <a href="mailto:pyrodekho@gmail.com">
                <FaEnvelope aria-hidden="true" /> pyrodekho@gmail.com
              </a>
            </li>
          </ul>

          <div className="ft-social">
            {SOCIALS.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <LinkColumn title="Products" links={PRODUCT_LINKS} />
        <LinkColumn title="Company" links={COMPANY_LINKS} />
        <LinkColumn title="Legal" links={LEGAL_LINKS} />
      </div>

      {/* BOTTOM BAR */}
      <div className="ft-bottom">
        <span>© 2026 PyroDekho.com — All rights reserved.</span>
        <span className="ft-bottom-note">Digital India ka Bharosa</span>
      </div>
    </footer>
  );
}

export default Footer;
