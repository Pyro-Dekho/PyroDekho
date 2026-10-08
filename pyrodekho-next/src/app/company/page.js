import "@/styles/company.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Company",
  description:
    "Learn about PyroDekho: cold pyro products, event crackers, our values and the planners, DJs and event companies we serve across India.",
  path: "/company",
});


const STATS = [
  { value: "100%", label: "Safety-first products" },
  { value: "Pan-India", label: "Event coverage" },
  { value: "0 Fire", label: "Cold pyro effects" },
  { value: "24/7", label: "Online booking" },
];

const OFFERS = [
  { icon: "❄️", title: "Cold Pyro Products", text: "Indoor & outdoor safe sparkle fountains." },
  { icon: "🎆", title: "Event Crackers", text: "For weddings, concerts & corporate events." },
  { icon: "🌫️", title: "Low Smoke & Noise", text: "Clean, comfortable celebrations." },
  { icon: "🎬", title: "Pro Visual Effects", text: "Professional-grade stage-ready effects." },
  { icon: "📅", title: "Event-based Booking", text: "Browse products and book online." },
  { icon: "🛡️", title: "Expert Guidance", text: "Clear advice on safe usage." },
];

const FEATURES = [
  "Safe for indoor use",
  "Non-flammable & low temperature",
  "Minimal smoke & odor",
  "Eco-friendly & audience-safe",
  "Ideal for weddings & stage shows",
];

const VALUES = [
  { title: "Safety First", text: "Customer and audience safety is our top priority." },
  { title: "Quality Assurance", text: "Only tested and reliable products." },
  { title: "Innovation", text: "Adopting the latest cold pyro technologies." },
  { title: "Trust & Transparency", text: "Clear product information and honest guidance." },
  { title: "Customer Delight", text: "Making every celebration unforgettable." },
];

const SERVE = [
  "Wedding Planners",
  "Event Management Companies",
  "DJs & Stage Performers",
  "Corporate Event Organizers",
  "Birthday & Private Party Hosts",
  "Exhibition & Launch Events",
];

const STANDOUT = [
  "100% focus on safe celebration solutions",
  "Modern digital platform for pyro products",
  "India-centric event requirements",
  "Professional & event-ready products",
  "Clear safety guidance & support",
];

function Company() {
  return (
    <>
      <Header />
      <main className="co-page">
        {/* HERO */}
        <section className="co-hero">
          <span className="co-eyebrow">About us</span>
          <h1>
            About <span>pyroDekho</span>
          </h1>
          <p>
            A modern digital platform for safe, smart &amp; spectacular
            celebrations across India.
          </p>
          <div className="co-hero-actions">
            <Link href="/book" className="co-btn co-btn-primary">Book Now</Link>
            <Link href="/contact" className="co-btn co-btn-ghost">Contact Us</Link>
          </div>
        </section>

        {/* STATS */}
        <section className="co-stats">
          {STATS.map((s) => (
            <div className="co-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* INTRO + MISSION */}
        <section className="co-wrap co-split">
          <div className="co-intro">
            <h2 className="co-title">Who we are</h2>
            <p>
              <strong>pyroDekho</strong> is a modern digital platform dedicated
              to showcasing and selling <strong>Cold Pyro products</strong> and{" "}
              <strong>premium event crackers</strong> across India. We bridge
              the gap between traditional fireworks and innovative,
              safety-first pyrotechnic solutions—delivering stunning visual
              effects suitable for both indoor and outdoor events.
            </p>
          </div>
          <div className="co-mission">
            <h2>Our Mission</h2>
            <p>
              To make celebrations <strong>safer, smarter, and more
              spectacular</strong> through advanced cold pyro technology and
              reliable event crackers—all accessible online with ease.
            </p>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="co-wrap">
          <h2 className="co-title co-center">What We Offer</h2>
          <div className="co-grid co-grid-3">
            {OFFERS.map((o) => (
              <div className="co-card" key={o.title}>
                <span className="co-icon" aria-hidden="true">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY COLD PYRO */}
        <section className="co-band">
          <div className="co-wrap">
            <h2 className="co-title co-center">Why Choose Cold Pyro?</h2>
            <p className="co-lead">
              Cold Pyro is a revolutionary celebration effect that produces
              sparkling fountain-style visuals without heat, fire, or harmful
              sparks.
            </p>
            <div className="co-features">
              {FEATURES.map((f) => (
                <div className="co-feature" key={f}>
                  <span aria-hidden="true">✔</span> {f}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="co-wrap">
          <h2 className="co-title co-center">Our Values</h2>
          <div className="co-grid co-grid-values">
            {VALUES.map((v, i) => (
              <div className="co-card co-value" key={v.title}>
                <span className="co-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO WE SERVE */}
        <section className="co-wrap">
          <h2 className="co-title co-center">Who We Serve</h2>
          <div className="co-chips">
            {SERVE.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>

        {/* WHY STAND OUT */}
        <section className="co-wrap">
          <div className="co-standout">
            <h2>Why pyroDekho Stands Out</h2>
            <ul>
              {STANDOUT.map((s) => (
                <li key={s}>
                  <span aria-hidden="true">✔</span> {s}
                </li>
              ))}
            </ul>
            <Link href="/book" className="co-btn co-btn-primary">
              Plan your celebration
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Company;
