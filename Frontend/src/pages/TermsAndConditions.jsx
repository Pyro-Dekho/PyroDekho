import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Term.css";

function TermsAndConditions() {
  return (
    <>
      <Header />

      <div className="terms-container">
        <h1 className="terms-title">Terms & Conditions</h1>

        <p className="terms-intro">
          Welcome to <strong>pyroDekho</strong>. By accessing or using our website,
          products, or services, you agree to comply with and be bound by the
          following Terms and Conditions. Please read them carefully before
          making any purchase.
        </p>

        <section className="terms-section">
          <h2>1. General</h2>
          <ul>
            <li>pyroDekho is a digital platform that offers Cold Pyro products for events and celebrations.</li>
            <li>You must be at least 18 years of age or use the website under the supervision of a legal guardian.</li>
            <li>We reserve the right to modify these Terms & Conditions at any time without prior notice.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>2. Product Information</h2>
          <ul>
            <li>Cold Pyro products sold on pyroDekho are non-explosive and non-fire when used correctly.</li>
            <li>Product images are for representation purposes only; actual products may vary slightly.</li>
            <li>Customers are responsible for reading product descriptions and safety guidelines.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Usage & Safety Responsibility</h2>
          <ul>
            <li>Products must be used strictly as instructed and with compatible systems.</li>
            <li>Misuse or unauthorized modification is strictly prohibited.</li>
            <li>pyroDekho is not responsible for injury, damage, or loss due to improper use.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Orders & Payments</h2>
          <ul>
            <li>All orders are subject to availability and confirmation.</li>
            <li>Prices may change without prior notice.</li>
            <li>Full payment is required before order processing and dispatch.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Shipping & Delivery</h2>
          <ul>
            <li>Delivery timelines are estimates and may vary.</li>
            <li>We are not responsible for courier delays or force majeure events.</li>
            <li>Customers must provide accurate delivery details.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Returns & Refunds</h2>
          <ul>
            <li>Returns or refunds are not accepted after delivery unless the item is damaged or incorrect.</li>
            <li>Issues must be reported within 24 hours with valid proof.</li>
            <li>Approved refunds will be processed as per company policy.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Intellectual Property</h2>
          <ul>
            <li>All content on pyroDekho is our intellectual property.</li>
            <li>Unauthorized use or reproduction is strictly prohibited.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>8. Legal Compliance</h2>
          <ul>
            <li>Customers must comply with local laws and venue regulations.</li>
            <li>pyroDekho does not guarantee venue or authority approvals.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <ul>
            <li>pyroDekho is not liable for indirect or consequential damages.</li>
            <li>Liability is limited to the value of the purchased product.</li>
            <li>All disputes are subject to Indian jurisdiction.</li>
          </ul>
        </section>

        <section className="terms-section contact">
          <h2>10. Contact Information</h2>
          <p>Email: <strong>pyrodekho@gmail.com</strong></p>
          <p>Phone: <strong>9718410923</strong></p>
        </section>

        <p className="terms-footer">
          By using pyroDekho, you acknowledge that you have read, understood,
          and agreed to these Terms & Conditions.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default TermsAndConditions;
