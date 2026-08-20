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

<<<<<<< HEAD
=======
        console.log("Home API Response:", homeRes.data);
        console.log("Video API Response:", videoRes.data);
>>>>>>> 3a8f72d (Added Filter)

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

  // ===============================
  // SEARCH + CATEGORY FILTER
  // ===============================

  const filteredData = {};

  Object.entries(homeData).forEach(([category, items]) => {
<<<<<<< HEAD
    if (!Array.isArray(items)) return;
=======
    // Make sure items is an array
    if (!Array.isArray(items)) {
      return;
    }
>>>>>>> 3a8f72d (Added Filter)

    // console.log("Category:", category);
    // console.log("Items:", items);

<<<<<<< HEAD
=======
    // ===============================
    // CATEGORY FILTER
    // ===============================

    const categoryMatches =
      filter === "All" ||
      category.toLowerCase() === filter.toLowerCase();
    

    // If category doesn't match selected filter
    // skip this category
    if (!categoryMatches) {
      return;
    }

    // ===============================
    // SEARCH FILTER
    // ===============================

    const filteredItems = items.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      return title.includes(searchTerm.toLowerCase());
    });

    // Only add category if it has products
>>>>>>> 3a8f72d (Added Filter)
    if (filteredItems.length > 0) {
      filteredData[category] = filteredItems;
    }
  });

  // console.log("Selected Filter:", filter);
  // console.log("Search Term:", searchTerm);
  // console.log("Filtered Data:", filteredData);

  // Always use filteredData
  const displayData = filteredData;

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

      {Object.keys(displayData).length === 0 && (
        <p className="no-results">
          No products found 🔍
        </p>
      )}

      {/* ===============================
          PRODUCT SECTIONS
      ================================ */}

      {Object.entries(displayData).map(
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