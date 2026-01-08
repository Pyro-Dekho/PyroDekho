import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/safety.css";

function Safety() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="safety-hero">
        <h1>Cold Pyro Safety Information</h1>
        <p>
          Designed for stunning visual effects with the highest safety standards
        </p>
      </section>

      {/* CONTENT */}
      <section className="safety-container">

        <div className="safety-card">
          <h2>What is Cold Pyro?</h2>
          <p>
            Cold Pyro is a special cold spark effect material designed to produce
            bright, visually appealing sparks without heat, flame, or explosion
            when used with approved systems. It is widely used in weddings,
            stage shows, concerts, parties, and indoor events.
          </p>
        </div>

        <div className="safety-card">
          <h2>Why Cold Pyro is Safe</h2>
          <ul>
            <li>No gunpowder or explosive chemicals</li>
            <li>Sparks are cool to touch and do not cause burns</li>
            <li>No open fire, no smoke, no harmful gases</li>
            <li>Safe for indoor and outdoor use</li>
          </ul>
        </div>

        <div className="safety-card">
          <h2>Usage Safety Guidelines</h2>
          <ul>
            <li>Use only with compatible cold spark machines</li>
            <li>Follow seller and manufacturer instructions</li>
            <li>Do not mix with other substances</li>
            <li>Keep away from water and moisture</li>
            <li>Never ignite manually</li>
          </ul>
        </div>

        <div className="safety-card">
          <h2>Storage & Handling Safety</h2>
          <ul>
            <li>Store in a cool, dry place</li>
            <li>Keep in original sealed packaging</li>
            <li>Keep away from children and pets</li>
            <li>Do not reuse spilled or contaminated material</li>
          </ul>
        </div>

        <div className="safety-card">
          <h2>Event & Venue Safety</h2>
          <ul>
            <li>Maintain safe distance from people and decor</li>
            <li>Adjust spark height according to venue size</li>
            <li>Ensure proper ventilation indoors</li>
            <li>Follow venue and local safety regulations</li>
          </ul>
        </div>

        <div className="safety-card">
          <h2>Environmental & Health Safety</h2>
          <ul>
            <li>Minimal residue, no toxic smoke</li>
            <li>Safe for short-term exposure</li>
            <li>Avoid inhaling powder directly</li>
          </ul>
        </div>

        <div className="safety-disclaimer">
          <h3>Disclaimer</h3>
          <p>
            Cold Pyro is safe when used responsibly and as directed. PyroDekho
            shall not be liable for any damage or injury caused by misuse,
            improper storage, or use with non-compatible systems.
          </p>
        </div>

      </section>

      <Footer />
    </>
  );
}

export default Safety;
