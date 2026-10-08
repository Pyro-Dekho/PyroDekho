"use client";

import Link from "next/link";
import "@/styles/ProductDetail.css";

export default function Error({ retry }) {
  return (
    <div className="pd-not-found">
      <h1>Something went wrong</h1>
      <p>We couldn&apos;t load this page right now. Please try again.</p>
      <button className="pd-btn pd-btn-primary" onClick={() => retry()}>
        Try again
      </button>
      <p>
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
}
