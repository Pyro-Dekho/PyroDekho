"use client";

import toast from "react-hot-toast";
import { FaShareAlt } from "react-icons/fa";

function ShareButton({ title }) {
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied 📋");
      }
    } catch {
      // share dialog dismissed
    }
  };

  return (
    <button
      className="pd-share"
      onClick={handleShare}
      aria-label="Share this product"
    >
      <FaShareAlt /> Share
    </button>
  );
}

export default ShareButton;
