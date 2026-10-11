import JsonLd from "@/components/JsonLd";
import { SEO_CONTENT } from "@/lib/seoContent";

// Intro text and FAQ for a category page. The FAQ uses native <details>
// (no JavaScript) and is also sent to search engines as FAQ structured data.
export default function SeoContent({ category }) {
  const content = SEO_CONTENT[category];
  if (!content) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="seoc-section">
      <h2 className="seoc-heading">{content.heading}</h2>
      {content.paragraphs.map((text) => (
        <p className="seoc-text" key={text}>
          {text}
        </p>
      ))}

      <h2 className="seoc-heading seoc-faq-heading">Frequently asked questions</h2>
      <div className="seoc-faq">
        {content.faqs.map((faq) => (
          <details className="seoc-item" key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>

      <JsonLd data={faqSchema} />
    </section>
  );
}
