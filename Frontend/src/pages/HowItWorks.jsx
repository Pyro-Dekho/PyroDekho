import "../styles/howItWorks.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
function HowItWorks() {
  return (
    <>
      <Header/>

      <div className="how-container">
      {/* HERO */}
      <section className="how-hero">
        <h1>How <span>pyroDekho</span> Works</h1>
        <p>
          Discover, plan, and celebrate with safe & spectacular Cold Pyro
          effects — stress-free and guided by experts.
        </p>
      </section>

      {/* INTRO */}
      <section className="how-section intro">
        <p>
          At <strong>pyroDekho</strong>, we make discovering and planning stunning
          celebrations simple, safe, and hassle-free. Our platform helps you
          explore Cold Pyro products and event crackers with complete
          transparency, expert guidance, and safety assurance.
        </p>
      </section>

      {/* STEPS */}
      <section className="how-steps">
        <h2>Step-by-Step Process</h2>

        <div className="step-card">
          <span className="step-number">1</span>
          <h3>Explore Our Products</h3>
          <p>
            Browse our online collection of Cold Pyro effects (indoor & outdoor)
            and premium event crackers for weddings, parties, and shows.
          </p>
          <ul>
            <li>High-quality visuals</li>
            <li>Usage & safety details</li>
            <li>Recommended event types</li>
          </ul>
        </div>

        <div className="step-card">
          <span className="step-number">2</span>
          <h3>Choose the Right Effect</h3>
          <p>
            Select products based on your celebration needs:
          </p>
          <ul>
            <li>Event type (wedding, birthday, concert, corporate)</li>
            <li>Indoor or outdoor venue</li>
            <li>Duration & visual impact</li>
          </ul>
        </div>

        <div className="step-card">
          <span className="step-number">3</span>
          <h3>Enquire or Book Online</h3>
          <p>
            Submit an enquiry directly through our website by sharing:
          </p>
          <ul>
            <li>Event date</li>
            <li>Venue type</li>
            <li>Location & requirements</li>
          </ul>
        </div>

        <div className="step-card">
          <span className="step-number">4</span>
          <h3>Expert Confirmation & Guidance</h3>
          <p>
            Our professionals verify your selection and provide:
          </p>
          <ul>
            <li>Safe placement recommendations</li>
            <li>Quantity & setup guidance</li>
            <li>Usage instructions & safety norms</li>
          </ul>
        </div>

        <div className="step-card">
          <span className="step-number">5</span>
          <h3>Event Execution</h3>
          <p>
            Cold Pyro products are prepared and executed as per venue and safety
            standards, producing stunning spark effects without heat or fire.
          </p>
        </div>

        <div className="step-card">
          <span className="step-number">6</span>
          <h3>Celebrate Safely</h3>
          <p>
            Enjoy eye-catching spark visuals with indoor-safe effects, minimal
            smoke, and low noise — leaving your guests amazed and delighted.
          </p>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="how-tech">
        <h2>How Cold Pyro Works</h2>
        <p>
          Cold Pyro machines use special granules that create sparkling effects
          when electrically triggered.
        </p>

        <div className="tech-grid">
          <div>✔ Sparks remain cool to touch</div>
          <div>✔ No flame or explosion</div>
          <div>✔ Controlled height & duration</div>
          <div>✔ Safe for indoor use when operated correctly</div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="how-safety">
        <h2>Our Safety Promise</h2>
        <ul>
          <li>Clear safety instructions with every product</li>
          <li>Controlled and verified operation methods</li>
          <li>Suitable for stage, wedding & indoor venues</li>
          <li>Expert customer guidance before execution</li>
        </ul>
      </section>

      {/* WHY IT MATTERS */}
      <section className="how-footer">
        <h2>Why This Process Matters</h2>
        <div className="why-grid">
          <span>✔ Easy online discovery</span>
          <span>✔ Expert-verified product usage</span>
          <span>✔ Safe & controlled celebration effects</span>
          <span>✔ Stress-free event planning</span>
        </div>
      </section>
    </div>

      <Footer/>
    </>
  );
}

export default HowItWorks;
