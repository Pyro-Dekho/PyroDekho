import Link from "next/link";
import "@/styles/ProductDetail.css";

export default function ProductNotFound() {
  return (
    <div className="pd-not-found">
      <h2>Product not found</h2>
      <p>This product may have been removed or the link is incorrect.</p>
      <Link className="pd-btn pd-btn-primary" href="/">
        Back to Home
      </Link>
    </div>
  );
}
