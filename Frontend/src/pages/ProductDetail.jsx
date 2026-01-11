import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/ProductDetail.css";
import axios from "axios";

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

        const res = await axios.get(`${API}/products/${slug}`);

        // axios response data
        setProduct(res.data.data);
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

          <p className="product-price">Starting ₹{product.price} / piece</p>

          <ul className="product-highlights">
            <li>✔ Safe & smokeless pyro effect</li>
            <li>✔ Suitable for events & celebrations</li>
            <li>✔ Easy to use</li>
          </ul>

          {/* ================= TECHNICAL DETAILS ================= */}
          {(product.category || product.technical) && (
            <div className="technical-details">
              <h2 className="font-bold">Technical Parameters</h2>

              {product.technical &&
                Object.entries(product.technical)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <div className="tech-row" key={key}>
                      <span>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (char) => char.toUpperCase())}
                      </span>
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

export default ProductDetail;
