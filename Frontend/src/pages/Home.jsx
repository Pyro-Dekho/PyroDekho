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
  // ===============================
  // STATE
  // ===============================

  const [homeData, setHomeData] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected category
  const [filter, setFilter] = useState("All");

  // Search text
  const [searchTerm, setSearchTerm] = useState("");

  // ===============================
  // FETCH HOME DATA
  // ===============================

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

  // ===============================
  // FILTER DATA
  // ===============================
  
  console.log(homeData)
  console.log(videos)
  const filteredData = {};

  Object.entries(homeData).forEach(([category, items]) => {
    // Make sure items is an array
    if (!Array.isArray(items)) return;

    const filteredItems = items.filter((item) => {
      // ===============================
      // SEARCH FILTER
      // ===============================

      const productName = item?.name || item?.productName || "";

      const matchesSearch = productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // ===============================
      // CATEGORY FILTER
      // ===============================

      const matchesCategory =
        filter === "All" || category === filter;

      return matchesSearch && matchesCategory;
    });

    // Add category only if products exist
    if (filteredItems.length > 0) {
      filteredData[category] = filteredItems;
    }
  });

  // ===============================
  // LOADING STATE
  // ===============================

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <>
      {/* ===============================
          HEADER
      ================================ */}

      <Header />

      {/* ===============================
          SEARCH + FILTER
      ================================ */}

      <div className="home-search-wrapper">
        {/* SEARCH INPUT */}

        <input
          type="text"
          className="home-search-input"
          placeholder="Search fireworks, crackers, pyros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* FILTER LABEL */}

        <label htmlFor="filter" id="filter-title">
          Filter:
        </label>

        {/* CATEGORY SELECT */}

        <select
          name="filter"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>

          <option value="mostSearched">
            Most Searched
          </option>

          <option value="smokeless">
            Smokeless
          </option>

          <option value="event">
            Event
          </option>

          <option value="club">
            Club
          </option>

          <option value="wedding">
            Wedding
          </option>

          <option value="stage">
            Stage
          </option>

          <option value="birthday">
            Birthday
          </option>

          <option value="fog">
            Fog
          </option>
        </select>
      </div>

      {/* ===============================
          HERO SLIDER
      ================================ */}

      <Slider />

      {/* ===============================
          NO RESULTS
      ================================ */}

      {Object.keys(filteredData).length === 0 && (
        <p className="no-results">
          No products found 🔍
        </p>
      )}

      {/* ===============================
          PRODUCT SECTIONS
      ================================ */}

      {Object.entries(filteredData).map(
        ([category, items]) => (
          <section
            key={category}
            className="home-section"
          >
            {/* CATEGORY TITLE */}

            <h2 className="section-title">
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) =>
                  str.toUpperCase()
                )}
            </h2>

            {/* PRODUCTS */}

            <div className="listings">
              {items.map((product) => (
                <CardListing
                  key={product._id}
                  {...product}
                />
              ))}
            </div>
          </section>
        )
      )}

      {/* ===============================
          VIDEOS
      ================================ */}

      <VideoGrid videos={videos} />

      {/* ===============================
          FOOTER
      ================================ */}

      <Footer />
    </>
  );
}

export default Home;