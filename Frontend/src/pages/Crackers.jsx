import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoGrid from "../components/VideoGrid";
import HomeListingCard from "../components/HomeListingCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

import "../styles/cracker.css";
import "../styles/videoGrid.css";
import "../styles/listing.css";

function Crackers() {
  const [crackers, setCrackers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [crackerRes, videoRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products?category=cracker"),
        axios.get("http://localhost:5000/api/videos?type=cracker"),
      ]);

      setCrackers(crackerRes.data.data || []); 
      setVideos(videoRes.data.data || []);     
    } catch (err) {
      console.error("Crackers page fetch error:", err);
      setError("Unable to load crackers at the moment ❌");
      toast.error("Failed to load crackers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  /* =====================
     LOADING STATE
  ===================== */
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Loading crackers...
        </p>
      </>
    );
  }

  /* =====================
     ERROR STATE
  ===================== */
  if (error) {
    return (
      <>
        <Header />
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#dc2626",
            fontSize: "18px",
          }}
        >
          {error}
        </div>
        <Footer />
      </>
    );
  }

  const filteredCrackers = crackers.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />

      {/* 🔥 PRODUCTS */}
      <section className="page-container">
        <h2 className="page-title">Crackers</h2>

        {/* 🔍 SEARCH */}
        <div className="page-search-wrapper">
          <input
            type="text"
            className="page-search-input"
            placeholder="Search pyro effects, crackers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="listings">
          {filteredCrackers.length > 0 ? (
            filteredCrackers.map((product) => (
              <HomeListingCard key={product._id} {...product} />
            ))
          ) : searchTerm ? (
            <p className="no-results">
              No crackers found for “{searchTerm}” 🔍
            </p>
          ) : (
            <p className="no-results">
              No crackers available right now 🎆
            </p>
          )}
        </div>
      </section>

      {/* 🎥 VIDEOS */}
      {videos.length > 0 && <VideoGrid videos={videos} />}

      <Footer />
    </>
  );
}

export default Crackers;
