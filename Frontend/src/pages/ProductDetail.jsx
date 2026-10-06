import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaWhatsapp, FaPhoneAlt, FaShareAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import CardListing from "../components/CardListing";
import "../styles/ProductDetail.css";
import "../styles/listing.css";
import axios from "axios";
import optimizeImage from "../utils/optimizeImage";

const API = import.meta.env.VITE_API_BASE_URL;

const WHATSAPP_NUMBER = "919412660853";
const CALL_NUMBER = "9718410923";

// Categories that have their own listing page
const CATEGORY_PAGES = {
  indoor: "/indoor",
  outdoor: "/outdoor",
  cracker: "/crackers",
};

const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API}/products/${slug}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  // Page title + related products
  useEffect(() => {
    if (!product) return;

    document.title = `${product.title} | PyroDekho`;

    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${API}/products?category=${product.category}`,
        );
        setRelated(
          (res.data.data || [])
            .filter((item) => item._id !== product._id)
            .slice(0, 4),
        );
      } catch (err) {
        console.error("Related products error:", err);
        setRelated([]);
      }
    };

    fetchRelated();

    return () => {
      document.title = "Pyro Dekho";
    };
  }, [product]);

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
        <div className="pd-not-found">
          <h2>Product not found</h2>
          <p>This product may have been removed or the link is incorrect.</p>
          <button className="pd-btn pd-btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const tech = product.technical || {};
  const inStock = !/out/i.test(tech.availability || "");

  // Key specs shown as chips; everything else goes in the table
  const chipKeys = ["burnTime", "sparkHeight", "smoke"];
  const chips = chipKeys.filter((key) => tech[key]);
  const tableRows = Object.entries(tech).filter(
    ([key, value]) => value && !chipKeys.includes(key),
  );

  const categoryLabel = product.category ? formatLabel(product.category) : "";
  const categoryPage = CATEGORY_PAGES[product.category];

  const message = `Hi PyroDekho, I'm interested in "${product.title}" (Starting ₹${product.price} / piece). Please share more details.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleBook = () =>
    navigate("/book", { state: { productTitle: product.title } });

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied 📋");
      }
    } catch {
      // share dialog dismissed
    }
  };

  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <Header />

      <div className="pd-page">
        {/* BREADCRUMBS */}
        <nav className="pd-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {categoryLabel && (
            <>
              <span>/</span>
              {categoryPage ? (
                <Link to={categoryPage}>{categoryLabel}</Link>
              ) : (
                <span>{categoryLabel}</span>
              )}
            </>
          )}
          <span>/</span>
          <span className="pd-crumb-current">{product.title}</span>
        </nav>

        <div className="pd-layout">
          {/* LEFT IMAGE */}
          <div
            className="pd-image"
            onMouseMove={handleZoomMove}
            onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
          >
            <img
              src={optimizeImage(product.image, 1000)}
              alt={product.title}
              decoding="async"
              style={
                zoom.active
                  ? {
                      transform: "scale(1.8)",
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    }
                  : undefined
              }
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="pd-info">
            <div className="pd-top-row">
              {categoryLabel && <span className="pd-tag">{categoryLabel}</span>}
              {tech.availability && (
                <span className={`pd-stock ${inStock ? "in" : "out"}`}>
                  {tech.availability}
                </span>
              )}
              <button
                className="pd-share"
                onClick={handleShare}
                aria-label="Share this product"
              >
                <FaShareAlt /> Share
              </button>
            </div>

            <h1 className="pd-title">{product.title}</h1>

            <p className="pd-price">
              Starting ₹{product.price}
              <span> / piece</span>
            </p>

            {/* KEY SPECS */}
            {chips.length > 0 && (
              <div className="pd-chips">
                {chips.map((key) => (
                  <div className="pd-chip" key={key}>
                    <span className="pd-chip-label">{formatLabel(key)}</span>
                    <span className="pd-chip-value">{tech[key]}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ACTIONS */}
            <div className="pd-actions">
              <button className="pd-btn pd-btn-primary" onClick={handleBook}>
                Book Now / Get Quote
              </button>
              <a
                className="pd-btn pd-btn-whatsapp"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <a className="pd-btn pd-btn-outline" href={`tel:${CALL_NUMBER}`}>
                <FaPhoneAlt /> Call
              </a>
            </div>

            {/* TRUST */}
            <ul className="pd-trust">
              <li>✔ Safe & smokeless pyro effect</li>
              <li>✔ Suitable for events & celebrations</li>
              <li>✔ Easy to use</li>
              <li>🚚 All India delivery</li>
            </ul>

            {/* TECHNICAL TABLE */}
            {tableRows.length > 0 && (
              <div className="pd-specs">
                <h2>Technical Parameters</h2>
                {tableRows.map(([key, value]) => (
                  <div className="pd-spec-row" key={key}>
                    <span>{formatLabel(key)}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="pd-related">
            <h2>You may also like</h2>
            <div className="listings">
              {related.map((item) => (
                <CardListing key={item._id} {...item} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* STICKY MOBILE BAR */}
      <div className="pd-sticky-bar">
        <a className="pd-btn pd-btn-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
          <FaWhatsapp /> WhatsApp
        </a>
        <button className="pd-btn pd-btn-primary" onClick={handleBook}>
          Book Now
        </button>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
