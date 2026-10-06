import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/listing.css";
import CardListing from "../components/CardListing";
import { useSearch } from "../context/SearchContext";

const API = import.meta.env.VITE_API_BASE_URL;

function Outdoor() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();

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

        <section className="listings">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CardListing key={product._id} {...product} />
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
