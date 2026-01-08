import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoGrid from "../components/VideoGrid";
import HomeListingCard from "../components/HomeListingCard";
import Slider from "../components/HeroSlider";
import Loader from "../components/Loader";
import "../styles/Home.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [homeData, setHomeData] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(API)

  /* ===============================
     FETCH HOME DATA (PRODUCTION SAFE)
  ================================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const homeRes = await fetch(`${API}/products/home`);
        const videoRes = await fetch(`${API}/videos?type=home`);

        const homeJson = await homeRes.json();
        const videoJson = await videoRes.json();

        setHomeData(homeJson?.data || {});
        setVideos(videoJson?.data || videoJson || []);
      } catch (error) {
        console.error("Home page fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ===============================
     LOADING STATE
  ================================ */
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  /* ===============================
     SEARCH FILTER (SAFE)
  ================================ */
  const filteredData = {};

  Object.entries(homeData).forEach(([category, items]) => {
    if (!Array.isArray(items)) return;

    const filteredItems = items.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredItems.length > 0) {
      filteredData[category] = filteredItems;
    }
  });

  const displayData = searchTerm ? filteredData : homeData;

  return (
    <>
      <Header />

      {/* 🔍 SEARCH BAR */}
      <div className="home-search-wrapper">
        <input
          type="text"
          className="home-search-input"
          placeholder="Search fireworks, crackers, pyros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🎬 HERO SLIDER */}
      <Slider />

      {/* 🧨 PRODUCT SECTIONS */}
      {Object.keys(displayData).length === 0 && (
        <p className="no-results">No products found 🔍</p>
      )}

      {Object.entries(displayData).map(([category, items]) => (
        <section key={category} className="home-section">
          <h2 className="section-title">
            {category
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </h2>

          <div className="listings">
            {items.map((product) => (
              <HomeListingCard key={product._id} {...product} />
            ))}
          </div>
        </section>
      ))}

      {/* 🎥 VIDEOS */}
      <VideoGrid videos={videos} />

      <Footer />
    </>
  );
}

export default Home;
