"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cloudinaryLoader } from "@/utils/optimizeImage";

function CardListing({ image, title, price, slug, category }) {
  const router = useRouter();

  const { isAuth, loading } = useAuth();

  // A real link (so search engines can follow it), but visitors must be
  // logged in to open product details
  const handleViewDetails = (e) => {
    // Wait until the login check (token or Google cookie) has finished
    if (loading) {
      e.preventDefault();
      return;
    }

    if (!isAuth) {
      e.preventDefault();
      toast.error("Please login or sign up to view product details 🔐");
      router.push("/login");
    }
  };

  return (
    <div className="card">
      {image && (
        <Image
          loader={cloudinaryLoader}
          src={image}
          alt={title}
          width={500}
          height={400}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}

      <div className="card-body flex flex-col gap-4">
        <h3>{title}</h3>

        <p className="text-gray-600">
          Starting ₹{price} / piece
        </p>

        <Link
          href={`/${category}/${slug}`}
          className="btn-filled mt-2"
          onClick={handleViewDetails}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CardListing;
