import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoGrid from "../components/VideoGrid";
import CardListing from "../components/CardListing";
import Slider from "../components/HeroSlider";
import Loader from "../components/Loader";
import "../styles/Home.css";
import axios from "axios";
import { useSearch } from "../context/SearchContext";

const API = import.meta.env.VITE_API_BASE_URL;

function Home() {
  // ===============================
  // STATE
  // ===============================

  const [homeData, setHomeData] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search text and selected category (both set in the Header)
  const { searchTerm, filters } = useSearch();

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
  
  // console.log(homeData)
  // console.log(videos)
  // Hide the hero slider while the user is searching or filtering
  const isFiltering = searchTerm.trim() !== "" || filters.length > 0;

  const filteredData = {};

  Object.entries(homeData).forEach(([category, items]) => {
    // Make sure items is an array
    if (!Array.isArray(items)) return;
    // console.log(items)

    // "mostSearched" -> "most searched"
    const categoryLabel = category
      .replace(/([A-Z])/g, " $1")
      .toLowerCase();
    const query = searchTerm.trim().toLowerCase();

    // Searching a category name (e.g. "most searched", "fog") shows the whole section
    const categoryMatchesSearch =
      query !== "" &&
      (categoryLabel.includes(query) ||
        category.toLowerCase().includes(query));

    const filteredItems = items.filter((item) => {
      // ===============================
      // SEARCH FILTER
      // ===============================

      const productName = item?.title || "";

      const matchesSearch =
        categoryMatchesSearch ||
        productName.toLowerCase().includes(query);

      // ===============================
      // CATEGORY FILTER
      // ===============================

      const matchesCategory =
        filters.length === 0 || filters.includes(category);

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
          HERO SLIDER
      ================================ */}

      {!isFiltering && <Slider />}

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