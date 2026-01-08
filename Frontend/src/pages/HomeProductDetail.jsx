import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/homeProductDetail.css";

const API = import.meta.env.VITE_API_BASE_URL;

function HomeProductDetail() {
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

        const json = await res.json();
        setProduct(json.data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
        <Footer />
      </>
    );
  }

  /* ================= NOT FOUND ================= */
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

        {/* RIGHT DETAILS */}
        <div className="home-product-info">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1 className="product-title">{product.title}</h1>

          <p className="product-price">
            Starting ₹{product.price} / piece
          </p>

          <ul className="product-highlights">
            <li>✔ Safe & smokeless pyro effect</li>
            <li>✔ Suitable for events & celebrations</li>
            <li>✔ Easy to use</li>
          </ul>

          {/* ================= TECHNICAL DETAILS ================= */}
          {(product.category || product.technical) && (
            <div className="technical-details">
              <h2>Technical Parameters</h2>

              

              {/* Show only fields with value */}
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
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomeProductDetail;
