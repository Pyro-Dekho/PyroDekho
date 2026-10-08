import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import Loader from "@/components/Loader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory, getVideos } from "@/lib/api";

import "@/styles/cracker.css";
import "@/styles/videoGrid.css";
import "@/styles/listing.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crackers & Pyro Effects",
  description:
    "Premium event crackers and pyro effects for weddings and celebrations. Watch testing videos and get the best price.",
  path: "/crackers",
});

async function CrackersContent() {
  const [crackers, videos] = await Promise.all([
    getProductsByCategory("cracker"),
    getVideos("cracker"),
  ]);

  return (
    <>
      {/* 🔥 PRODUCTS */}
      <section className="page-container">
        <h1 className="page-title">Crackers</h1>

        <div className="listings">
          <ProductGrid
            products={crackers}
            emptyClassName="no-results"
            emptyText="No crackers available right now 🎆"
            searchEmptyText="No crackers found for “{q}” 🔍"
          />
        </div>
      </section>

      {/* 🎥 VIDEOS */}
      {videos.length > 0 && <VideoGrid videos={videos} />}
    </>
  );
}

export default function CrackersPage() {
  return (
    <>
      <Header searchPlaceholder="Search pyro effects, crackers..." />

      <Suspense fallback={<Loader />}>
        <CrackersContent />
      </Suspense>

      <Footer />
    </>
  );
}
