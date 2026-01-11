import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoGrid from "../components/VideoGrid";
import CardListing from "../components/CardListing";
import Slider from "../components/HeroSlider";
import Loader from "../components/Loader";
import "../styles/Home.css";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [homeData, setHomeData] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* ===============================
     FETCH HOME DATA
  ================================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [homeRes, videoRes] = await Promise.all([
          axios.get(`${API}/products/home`),
          axios.get(`${API}/videos?type=home`),
        ]);


        
        setHomeData(homeRes?.data?.data || {});
        setVideos(videoRes?.data?.data || []);
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
     SEARCH FILTER
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
              <CardListing key={product._id} {...product} />
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
