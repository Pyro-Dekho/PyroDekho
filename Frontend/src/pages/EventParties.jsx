import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/eventParties.css";

function EventParties() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/videos?type=event"
      );

      const json = await res.json();
      setVideos(json.data); // ✅ FIX HERE
    } catch (error) {
      console.error("Event videos error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchVideos();
}, []);


  if (loading) {
    return (
      <>
        <Header />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <h2 className="page-title">Event & Wedding Videos</h2>

      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="video-card">
              <video controls preload="metadata">
                <source src={video.videoUrl} type="video/mp4" />
              </video>
              <h3 className="video-title">{video.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-videos">No videos found</p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default EventParties;
