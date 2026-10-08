import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/api";
import "@/styles/eventParties.css";

export const metadata = {
  title: "Event & Wedding Pyro Videos",
  description:
    "Watch cold pyro effects at real weddings, stage shows and parties by PyroDekho.",
};

async function EventVideos() {
  const videos = await getVideos("event");

  return videos.length > 0 ? (
    videos.map((video) => <VideoCard key={video._id} video={video} />)
  ) : (
    <p className="no-videos">No videos found</p>
  );
}

export default function EventPartiesPage() {
  return (
    <>
      <Header />

      <h1 className="page-title">Event & Wedding Videos</h1>

      <div className="video-grid">
        <Suspense fallback={<Loader />}>
          <EventVideos />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}
