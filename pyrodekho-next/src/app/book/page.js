import { Suspense } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookNowView from "@/views/BookNowView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book Cold Pyro for Your Event",
  description:
    "Book premium cold pyro effects for your wedding, birthday, stage show, corporate event or club night. Send an enquiry and our team will call you.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <Header />

      <section className="book-page">
        <div className="book-hero">
          <h1>Book Your Event</h1>
          <p>
            Let us make your celebration unforgettable with premium Cold Pyro
            effects
          </p>
        </div>

        <div className="book-container">
          {/* CONTACT INFO */}
          <div className="info-card">
            <h3>Get in Touch</h3>

            <div className="info-item">
              <FaPhoneAlt />
              <p>9718410923</p>
            </div>

            <div className="info-item">
              <FaWhatsapp />
              <p>9412660853</p>
            </div>

            <div className="info-item">
              <FaEnvelope />
              <p>pyrodekho@gmail.com</p>
            </div>
          </div>

          {/* FORM */}
          <div className="form-card">
            <h3>Send an Enquiry</h3>

            {/* Reads ?product= from the URL to pre-fill the message */}
            <Suspense>
              <BookNowView />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
