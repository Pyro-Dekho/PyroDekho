import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/privacyPolicy.css";

function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="privacy-page">
        <div className="privacy-card">
          <h1>Privacy Policy</h1>
          <p className="updated">Last Updated: January 2025</p>

          <section>
            <h2>Introduction</h2>
            <p>
              Welcome to <strong>PyroDekho</strong>. Your privacy is very
              important to us. This Privacy Policy explains how we collect,
              use, store, and protect your personal information when you
              access our website or use our services.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Delivery address and order details</li>
              <li>Account login information</li>
              <li>Device, browser, and IP address</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To create and manage your account</li>
              <li>To process orders and deliveries</li>
              <li>To provide customer support</li>
              <li>To improve our website experience</li>
              <li>To prevent fraud and misuse</li>
            </ul>
          </section>

          <section>
            <h2>Payment Security</h2>
            <p>
              All payments are processed through secure third-party payment
              gateways. PyroDekho does not store your card, UPI, or banking
              details.
            </p>
          </section>

          <section>
            <h2>Data Sharing</h2>
            <p>
              We do not sell or rent your personal information. Data may only
              be shared with delivery partners, payment providers, or legal
              authorities when required.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We use cookies to improve functionality, remember sessions,
              and analyze traffic. You may disable cookies in your browser
              settings.
            </p>
          </section>

          <section>
            <h2>Children’s Privacy</h2>
            <p>
              PyroDekho services are intended for users above 18 years of
              age. We do not knowingly collect data from minors.
            </p>
          </section>

          <section>
            <h2>Policy Updates</h2>
            <p>
              This Privacy Policy may be updated from time to time. Any
              changes will be reflected on this page.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p className="contact">
              📧 Email: pyroDekho@gmail.com <br />
              📞 Phone: 9999999999
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
