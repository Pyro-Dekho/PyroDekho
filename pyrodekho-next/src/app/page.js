import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import Loader from "@/components/Loader";
import HomeContent from "@/views/HomeContent";
import { getHomeProducts, getVideos } from "@/lib/api";
import "@/styles/Home.css";
import "@/styles/listing.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: { absolute: "Pyro Dekho | Buy Imported Cold Pyro for Weddings & Events" },
  path: "/",
});

async function HomeData() {
  const [homeData, videos] = await Promise.all([
    getHomeProducts(),
    getVideos("home"),
  ]);

  return (
    <>
      <HomeContent homeData={homeData} />
      <VideoGrid videos={videos} />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Header
        searchPlaceholder="Search fireworks, crackers, pyros..."
        showFilter
      />

      <Suspense fallback={<Loader />}>
        <HomeData />
      </Suspense>

      <Footer />
    </>
  );
}
