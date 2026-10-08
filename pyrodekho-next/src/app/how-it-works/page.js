import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How It Works",
  description:
    "How PyroDekho works: explore cold pyro effects, choose the right one, enquire online and celebrate safely with expert guidance.",
  path: "/how-it-works",
});


const STEPS = [
  {
    icon: "🔍",
    title: "Explore Our Products",
    text: "Browse our online collection of Cold Pyro effects (indoor & outdoor) and premium event crackers for weddings, parties, and shows.",
    points: ["High-quality visuals", "Usage & safety details", "Recommended event types"],
  },
  {
    icon: "🎯",
    title: "Choose the Right Effect",
    text: "Select products based on your celebration needs:",
    points: [
      "Event type (wedding, birthday, concert, corporate)",
      "Indoor or outdoor venue",
      "Duration & visual impact",
    ],
  },
  {
    icon: "📝",
    title: "Enquire or Book Online",
    text: "Submit an enquiry directly through our website by sharing:",
    points: ["Event date", "Venue type", "Location & requirements"],
  },
  {
    icon: "🤝",
    title: "Expert Confirmation & Guidance",
    text: "Our professionals verify your selection and provide:",
    points: [
      "Safe placement recommendations",
      "Quantity & setup guidance",
      "Usage instructions & safety norms",
    ],
  },
  {
    icon: "🎬",
    title: "Event Execution",
    text: "Cold Pyro products are prepared and executed as per venue and safety standards, producing stunning spark effects without heat or fire.",
  },
  {
    icon: "🎉",
    title: "Celebrate Safely",
    text: "Enjoy eye-catching spark visuals with indoor-safe effects, minimal smoke, and low noise — leaving your guests amazed and delighted.",
  },
];

const TECH = [
  { icon: "❄️", text: "Sparks remain cool to touch" },
  { icon: "🚫", text: "No flame or explosion" },
  { icon: "📏", text: "Controlled height & duration" },
  { icon: "🏛️", text: "Safe for indoor use when operated correctly" },
];

const PROMISE = [
  "Clear safety instructions with every product",
  "Controlled and verified operation methods",
  "Suitable for stage, wedding & indoor venues",
  "Expert customer guidance before execution",
];

const WHY = [
  "Easy online discovery",
  "Expert-verified product usage",
  "Safe & controlled celebration effects",
  "Stress-free event planning",
];

function HowItWorks() {
  return (
    <>
      <Header />
      <main className="hw-page">
        {/* HERO */}
        <section className="hw-hero">
          <span className="hw-eyebrow">6 simple steps</span>
          <h1>
            How <span>pyroDekho</span> Works
          </h1>
          <p>
            Discover, plan, and celebrate with safe &amp; spectacular Cold Pyro
            effects — stress-free and guided by experts.
          </p>
        </section>

        {/* INTRO */}
        <section className="hw-wrap hw-intro">
          <p>
            At <strong>pyroDekho</strong>, we make discovering and planning
            stunning celebrations simple, safe, and hassle-free. Our platform
            helps you explore Cold Pyro products and event crackers with
            complete transparency, expert guidance, and safety assurance.
          </p>
        </section>

        {/* STEPS */}
        <section className="hw-wrap hw-steps-wrap">
          <h2 className="hw-title">Step-by-Step Process</h2>
          <ol className="hw-steps">
            {STEPS.map((s, i) => (
              <li className="hw-step" key={s.title}>
                <span className="hw-step-num">{i + 1}</span>
                <div className="hw-step-card">
                  <div className="hw-step-head">
                    <span className="hw-icon" aria-hidden="true">{s.icon}</span>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.text}</p>
                  {s.points && (
                    <ul>
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* TECHNOLOGY */}
        <section className="hw-band">
          <div className="hw-wrap">
            <h2 className="hw-title">How Cold Pyro Works</h2>
            <p className="hw-lead">
              Cold Pyro machines use special granules that create sparkling
              effects when electrically triggered.
            </p>
            <div className="hw-tech">
              {TECH.map((t) => (
                <div className="hw-tech-item" key={t.text}>
                  <span aria-hidden="true">{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAFETY PROMISE */}
        <section className="hw-wrap">
          <h2 className="hw-title">Our Safety Promise</h2>
          <div className="hw-promise">
            {PROMISE.map((p) => (
              <div className="hw-promise-item" key={p}>
                <span aria-hidden="true">✓</span>
                {p}
              </div>
            ))}
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="hw-wrap hw-last">
          <div className="hw-why">
            <h2>Why This Process Matters</h2>
            <div className="hw-why-grid">
              {WHY.map((w) => (
                <span key={w}>✔ {w}</span>
              ))}
            </div>
            <div className="hw-actions">
              <Link href="/book" className="hw-btn hw-btn-primary">Book Now</Link>
              <Link href="/safety" className="hw-btn hw-btn-ghost">Safety Info</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HowItWorks;
