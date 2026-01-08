import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/HomeProductDetail.css";

const API = import.meta.env.VITE_API_BASE_URL;

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Product fetch error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="not-found-message">Product Not Found</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="home-product-detail">
        {/* LEFT IMAGE */}
        <div className="home-product-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* RIGHT INFO */}
        <div className="home-product-info">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1 className="product-title">{product.title}</h1>

          <div className="product-price">
            Starting ₹{product.price} / piece
          </div>

          {/* HIGHLIGHTS */}
          <ul className="product-highlights">
            <li>Safe & smokeless pyro effect</li>
            <li>Suitable for events & celebrations</li>
            <li>Easy to use</li>
          </ul>

          {/* TECHNICAL DETAILS */}
          <div className="technical-details">
            <h2>Technical Details</h2>

            {/* Category */}
            {product.category && (
              <div className="tech-row">
                <span>Category</span>
                <span>{product.category}</span>
              </div>
            )}

            {/* Dynamic technical fields */}
            {product.technical &&
              Object.entries(product.technical)
                .filter(([_, value]) => value)
                .map(([key, value]) => (
                  <div className="tech-row" key={key}>
                    <span>{key.replace(/([A-Z])/g, " $1")}</span>
                    <span>{value}</span>
                  </div>
                ))}
          </div>

          <button className="enquiry-button">Enquiry Now</button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
