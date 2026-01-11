import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/about.css";

function About() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="about-hero">
        <h1>About pyroDekho</h1>
        <p>
          A trusted digital platform for safe, modern & spectacular
          <strong> Cold Pyro solutions</strong> across India.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            <strong>pyroDekho</strong> is a digital-first platform dedicated to
            providing high-quality Cold Pyro products for events, celebrations,
            and special moments across India.
          </p>

          <p>
            We believe celebrations should be spectacular yet safe. That’s why
            we focus on cold pyro solutions that deliver stunning spark effects
            without fire, smoke, or harmful chemicals.
          </p>

          <p>
            Our products are suitable for weddings, stage shows, concerts,
            parties, corporate events, and cultural programs.
          </p>
        </div>

        {/* RIGHT HIGHLIGHTS */}
        <div className="about-highlights">
          <h3>Why Choose pyroDekho?</h3>
          <ul>
            <li>✔ Safe for indoor & outdoor events</li>
            <li>✔ No fire, no smoke, no harmful chemicals</li>
            <li>✔ Ideal for weddings, concerts & stage shows</li>
            <li>✔ Quality-tested & safety-approved products</li>
            <li>✔ Easy online ordering & reliable support</li>
          </ul>
        </div>

      </section>

      {/* MISSION & VISION */}
      <section className="about-cards">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To provide safe, innovative, and high-quality cold pyro products
            that enhance celebrations while prioritizing people, venues, and
            the environment.
          </p>
        </div>

        <div className="about-card">
          <h3>Our Vision</h3>
          <p>
            To become India’s leading digital platform for cold pyro solutions,
            known for safety, reliability, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* FOOT NOTE */}
      <section className="about-footer-text">
        <p>
          With <strong>pyroDekho</strong>, every celebration shines brighter —
          <span> safely and responsibly.</span>
        </p>
      </section>

      <Footer />
    </>
  );
}

export default About;
