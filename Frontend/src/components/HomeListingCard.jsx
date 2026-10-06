import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import optimizeImage from "../utils/optimizeImage";

function HomeListingCard({ _id, image, title, price, slug }) {
  const navigate = useNavigate();

  const { isAuth, loading } = useAuth();

  const handleViewDetails = () => {
    // Wait until the login check (token or Google cookie) has finished
    if (loading) return;

    if (!isAuth) {
      toast.error("Please login or sign up to view product details 🔐");
      navigate("/login"); 
      return;
    }

    navigate(`/home-product/${slug}`);
  };

  return (
    <div className="card">
      <img
        src={optimizeImage(image, 500)}
        alt={title}
        loading="lazy"
        decoding="async"
        width="500"
        height="400"
      />

      <div className="card-body flex flex-col gap-4">
        <h3>{title}</h3>

        <p className="text-gray-600">
          Starting ₹{price} / piece
        </p>

        <button
          className="btn-filled mt-2"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default HomeListingCard;
