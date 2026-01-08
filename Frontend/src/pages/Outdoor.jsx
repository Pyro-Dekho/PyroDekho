import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeListingCard from "../components/HomeListingCard";
import Loader from "../components/Loader";
import "../styles/listing.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Outdoor() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/products?category=outdoor`);
        const json = await res.json();

        setProducts(json?.data || []);
      } catch (error) {
        console.error("Outdoor products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  // 🔍 FILTER PRODUCTS BY SEARCH
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="page-container">
        <h2 className="page-title">Outdoor Pyro Products</h2>

        {/* 🔍 SEARCH BAR */}
        <div className="page-search-wrapper">
          <input
            type="text"
            className="page-search-input"
            placeholder="Search outdoor pyro products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="listings">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <HomeListingCard key={product._id} {...product} />
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
              No products found
            </p>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Outdoor;
