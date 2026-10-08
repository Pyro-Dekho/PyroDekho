import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/safety.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cold Pyro Safety Information",
  description:
    "Cold pyro safety guide: why it is safe, usage guidelines, storage, venue and environmental safety.",
  path: "/safety",
});


const BADGES = [
  { icon: "🔥", label: "No open flame" },
  { icon: "🌡️", label: "Cool to touch" },
  { icon: "💨", label: "No toxic smoke" },
  { icon: "🏛️", label: "Indoor & outdoor" },
];

const SECTIONS = [
  {
    icon: "✨",
    title: "Why Cold Pyro is Safe",
    tone: "good",
    items: [
      "No gunpowder or explosive chemicals",
      "Sparks are cool to touch and do not cause burns",
      "No open fire, no smoke, no harmful gases",
      "Safe for indoor and outdoor use",
    ],
  },
  {
    icon: "📋",
    title: "Usage Safety Guidelines",
    items: [
      "Use only with compatible cold spark machines",
      "Follow seller and manufacturer instructions",
      "Do not mix with other substances",
      "Keep away from water and moisture",
      "Never ignite manually",
    ],
  },
  {
    icon: "📦",
    title: "Storage & Handling Safety",
    items: [
      "Store in a cool, dry place",
      "Keep in original sealed packaging",
      "Keep away from children and pets",
      "Do not reuse spilled or contaminated material",
    ],
  },
  {
    icon: "🎪",
    title: "Event & Venue Safety",
    items: [
      "Maintain safe distance from people and decor",
      "Adjust spark height according to venue size",
      "Ensure proper ventilation indoors",
      "Follow venue and local safety regulations",
    ],
  },
  {
    icon: "🌿",
    title: "Environmental & Health Safety",
    items: [
      "Minimal residue, no toxic smoke",
      "Safe for short-term exposure",
      "Avoid inhaling powder directly",
    ],
  },
];

function Safety() {
  return (
    <>
      <Header />
      <main className="sf-page">
        {/* HERO */}
        <section className="sf-hero">
          <span className="sf-eyebrow">🛡️ Safety first</span>
          <h1>
            Cold Pyro <span>Safety Information</span>
          </h1>
          <p>
            Designed for stunning visual effects with the highest safety
            standards.
          </p>
        </section>

        {/* BADGES */}
        <section className="sf-badges">
          {BADGES.map((b) => (
            <div className="sf-badge" key={b.label}>
              <span aria-hidden="true">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </section>

        <section className="sf-wrap">
          {/* WHAT IS */}
          <div className="sf-intro">
            <span className="sf-icon" aria-hidden="true">❄️</span>
            <div>
              <h2>What is Cold Pyro?</h2>
              <p>
                Cold Pyro is a special cold spark effect material designed to
                produce bright, visually appealing sparks without heat, flame,
                or explosion when used with approved systems. It is widely used
                in weddings, stage shows, concerts, parties, and indoor events.
              </p>
            </div>
          </div>

          {/* CARDS */}
          <div className="sf-grid">
            {SECTIONS.map((s) => (
              <article
                className={`sf-card${s.tone ? ` sf-card-${s.tone}` : ""}`}
                key={s.title}
              >
                <div className="sf-card-head">
                  <span className="sf-icon" aria-hidden="true">{s.icon}</span>
                  <h2>{s.title}</h2>
                </div>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* DISCLAIMER */}
          <div className="sf-disclaimer" role="note">
            <span className="sf-icon" aria-hidden="true">⚠️</span>
            <div>
              <h3>Disclaimer</h3>
              <p>
                Cold Pyro is safe when used responsibly and as directed.
                PyroDekho shall not be liable for any damage or injury caused
                by misuse, improper storage, or use with non-compatible
                systems.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="sf-cta">
            <p>Have a question about safe usage for your event?</p>
            <Link href="/contact" className="sf-btn">Talk to our team</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Safety;
