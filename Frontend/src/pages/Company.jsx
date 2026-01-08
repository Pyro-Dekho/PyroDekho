import "../styles/company.css";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Company() {
  return (
    <>
    <Header/>
    <div className="about-container">
      {/* HERO */}
      <section className="about-hero">
        <h1>About <span>pyroDekho</span></h1>
        <p>
          A modern digital platform for safe, smart & spectacular celebrations
          across India.
        </p>
      </section>

      {/* INTRO */}
      <section className="about-section">
        <p className="about-text">
          <strong>pyroDekho</strong> is a modern digital platform dedicated to
          showcasing and selling <strong>Cold Pyro products</strong> and
          <strong> premium event crackers</strong> across India.  
          We bridge the gap between traditional fireworks and innovative,
          safety-first pyrotechnic solutions—delivering stunning visual effects
          suitable for both indoor and outdoor events.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-card">
        <h2>Our Mission</h2>
        <p>
          To make celebrations <strong>safer, smarter, and more spectacular</strong>
          through advanced cold pyro technology and reliable event crackers—
          all accessible online with ease.
        </p>
      </section>

      {/* WHAT WE OFFER */}
      <section className="about-section">
        <h2>What We Offer</h2>
        <ul className="about-list">
          <li>Cold Pyro Products (Indoor & Outdoor Safe)</li>
          <li>Event Crackers for weddings, concerts & corporate events</li>
          <li>Low-smoke & low-noise solutions</li>
          <li>Professional-grade visual effects</li>
          <li>Event-based booking & online product display</li>
          <li>Expert guidance on safe usage</li>
        </ul>
      </section>

      {/* WHY COLD PYRO */}
      <section className="about-highlight">
        <h2>Why Choose Cold Pyro?</h2>
        <p>
          Cold Pyro is a revolutionary celebration effect that produces
          sparkling fountain-style visuals without heat, fire, or harmful
          sparks.
        </p>

        <div className="feature-grid">
          <div className="feature">✔ Safe for indoor use</div>
          <div className="feature">✔ Non-flammable & low temperature</div>
          <div className="feature">✔ Minimal smoke & odor</div>
          <div className="feature">✔ Eco-friendly & audience-safe</div>
          <div className="feature">✔ Ideal for weddings & stage shows</div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-box">
            <h3>Safety First</h3>
            <p>Customer and audience safety is our top priority</p>
          </div>
          <div className="value-box">
            <h3>Quality Assurance</h3>
            <p>Only tested and reliable products</p>
          </div>
          <div className="value-box">
            <h3>Innovation</h3>
            <p>Adopting the latest cold pyro technologies</p>
          </div>
          <div className="value-box">
            <h3>Trust & Transparency</h3>
            <p>Clear product information and honest guidance</p>
          </div>
          <div className="value-box">
            <h3>Customer Delight</h3>
            <p>Making every celebration unforgettable</p>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="about-section">
        <h2>Who We Serve</h2>
        <div className="serve-grid">
          <span>Wedding Planners</span>
          <span>Event Management Companies</span>
          <span>DJs & Stage Performers</span>
          <span>Corporate Event Organizers</span>
          <span>Birthday & Private Party Hosts</span>
          <span>Exhibition & Launch Events</span>
        </div>
      </section>

      {/* WHY STAND OUT */}
      <section className="about-footer">
        <h2>Why pyroDekho Stands Out</h2>
        <ul>
          <li>✔ 100% Focus on Safe Celebration Solutions</li>
          <li>✔ Modern Digital Platform for Pyro Products</li>
          <li>✔ India-Centric Event Requirements</li>
          <li>✔ Professional & Event-Ready Products</li>
          <li>✔ Clear Safety Guidance & Support</li>
        </ul>
      </section>
    </div>

    <Footer/>

    </>
  );
}

export default Company;
