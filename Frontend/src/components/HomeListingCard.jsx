import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function HomeListingCard({ _id, image, title, price, slug }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login or sign up to view product details 🔐");
      navigate("/login"); 
      return;
    }

    navigate(`/home-product/${slug}`);
  };

  return (
    <div className="card">
      <img src={image} alt={title} />

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
