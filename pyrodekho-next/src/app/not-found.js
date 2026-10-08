import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/ProductDetail.css";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="pd-not-found">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link className="pd-btn pd-btn-primary" href="/">
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
