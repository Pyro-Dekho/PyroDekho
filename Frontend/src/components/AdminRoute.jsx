import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ADMIN_EMAILS = [
  "shivam8130752247@gmail.com",
  "owner@pyrodekho.com",
];

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);

    if (!ADMIN_EMAILS.includes(decoded.email)) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
