import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/about.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "PyroDekho is a trusted digital platform for safe, modern and spectacular cold pyro solutions for weddings, stage shows and events across India.",
  path: "/about",
});


const HIGHLIGHTS = [
  "Safe for indoor & outdoor events",
  "No fire, no smoke, no harmful chemicals",
  "Ideal for weddings, concerts & stage shows",
  "Quality-tested & safety-approved products",
  "Easy online ordering & reliable support",
];

const USE_CASES = [
  "Weddings",
  "Stage Shows",
  "Concerts",
  "Parties",
  "Corporate Events",
  "Cultural Programs",
];

const STATS = [
  { value: "0", label: "Fire or open flame" },
  { value: "Indoor + Outdoor", label: "Safe everywhere" },
  { value: "Pan-India", label: "Event support" },
];

function About() {
  return (
    <>
      <Header />
      <main className="ab-page">
        {/* HERO */}
        <section className="ab-hero">
          <span className="ab-eyebrow">Our story</span>
          <h1>
            About <span>pyroDekho</span>
          </h1>
          <p>
            A trusted digital platform for safe, modern &amp; spectacular{" "}
            <strong>Cold Pyro solutions</strong> across India.
          </p>
        </section>

        {/* STATS */}
        <section className="ab-stats">
          {STATS.map((s) => (
            <div className="ab-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* MAIN */}
        <section className="ab-wrap ab-main">
          <div className="ab-text">
            <h2 className="ab-title">Who We Are</h2>
            <p>
              <strong>pyroDekho</strong> is a digital-first platform dedicated
              to providing high-quality Cold Pyro products for events,
              celebrations, and special moments across India.
            </p>
            <p>
              We believe celebrations should be spectacular yet safe. That’s
              why we focus on cold pyro solutions that deliver stunning spark
              effects without fire, smoke, or harmful chemicals.
            </p>
            <p>
              Our products are suitable for weddings, stage shows, concerts,
              parties, corporate events, and cultural programs.
            </p>
            <div className="ab-chips">
              {USE_CASES.map((u) => (
                <span key={u}>{u}</span>
              ))}
            </div>
          </div>

          <aside className="ab-highlights">
            <h3>Why Choose pyroDekho?</h3>
            <ul>
              {HIGHLIGHTS.map((h) => (
                <li key={h}>
                  <span aria-hidden="true">✔</span>
                  {h}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* MISSION & VISION */}
        <section className="ab-wrap ab-cards">
          <div className="ab-card">
            <span className="ab-icon" aria-hidden="true">🎯</span>
            <h3>Our Mission</h3>
            <p>
              To provide safe, innovative, and high-quality cold pyro products
              that enhance celebrations while prioritizing people, venues, and
              the environment.
            </p>
          </div>
          <div className="ab-card">
            <span className="ab-icon" aria-hidden="true">🔭</span>
            <h3>Our Vision</h3>
            <p>
              To become India’s leading digital platform for cold pyro
              solutions, known for safety, reliability, and customer
              satisfaction.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="ab-wrap">
          <div className="ab-cta">
            <p>
              With <strong>pyroDekho</strong>, every celebration shines
              brighter — <span>safely and responsibly.</span>
            </p>
            <Link href="/book" className="ab-btn">Book Now</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
