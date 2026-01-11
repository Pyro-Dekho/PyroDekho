import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/crackerDetail.css";

function CrackerDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [cracker, setCracker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCracker = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5000/api/products/${slug}`
        );

        if (!res.ok) {
          throw new Error("Cracker not found");
        }

        const data = await res.json();
        setCracker(data);
      } catch (err) {
        console.error(err);
        setError("Cracker not found ❌");
        setCracker(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCracker();
  }, [slug]);

  /* =====================
     LOADING STATE
  ===================== */
  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: "40px", textAlign: "center" }}>
          Loading cracker details...
        </div>
        <Footer />
      </>
    );
  }

  /* =====================
     ERROR / NOT FOUND
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
          <br />
          <button
            style={{
              marginTop: "20px",
              padding: "10px 18px",
              borderRadius: "6px",
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  /* =====================
     MAIN UI
  ===================== */
  return (
    <>
      <Header />

      <div className="cracker-detail-page">
        <div className="cracker-image-section">
          <img src={cracker.image} alt={cracker.title} />
        </div>

        <div className="cracker-info-section">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1>{cracker.title}</h1>
          <p className="current-price">₹{cracker.price}</p>

          <div className="technical-details">
            <h3>Technical Parameters</h3>

            {Object.entries(cracker.technical || {}).map(([key, value]) => (
              <p key={key}>
                <b>{key.replace(/([A-Z])/g, " $1")}:</b>{" "}
                {value || "—"}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CrackerDetail;
