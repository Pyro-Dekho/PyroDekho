import { Routes, Route } from "react-router-dom";

/* =====================
   PUBLIC PAGES
===================== */
import Home from "./pages/Home";
import About from "./pages/About";
import Safety from "./pages/Safety";
import ContactDetails from "./pages/ContactDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Company from "./pages/Company"
import HowItWorks from "./pages/HowItWorks"

/* =====================
   AUTH PAGES
===================== */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* =====================
   PRODUCT PAGES
===================== */
import Indoor from "./pages/Indoor";
import Outdoor from "./pages/Outdoor";
import Crackers from "./pages/Crackers";
import EventParties from "./pages/EventParties";

import ProductDetail from "./pages/IndoorAndOutdoor_ProductDetail";
import HomeProductDetail from "./pages/HomeProductDetail";
import CrackerDetail from "./pages/CrackerDetail";

/* =====================
   BOOKING
===================== */
import BookNow from "./pages/BookNow";

/* =====================
   ADMIN
===================== */
import AdminRoute from "./components/AdminRoute";
import AddProduct from "./pages/AddProduct";
import AddVideo from "./pages/AddVideo";

function App() {
  return (
    <Routes>

      {/* =====================
          PUBLIC ROUTES
      ===================== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/safety" element={<Safety />} />
      <Route path="/contact" element={<ContactDetails />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/company" element={<Company />} />
      <Route path="/how-it-works" element={<HowItWorks />} />



      {/* =====================
          AUTH ROUTES
      ===================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* =====================
          BOOKING
      ===================== */}
      <Route path="/book" element={<BookNow />} />

      {/* =====================
          PRODUCT LISTING
      ===================== */}
      <Route path="/indoor" element={<Indoor />} />
      <Route path="/outdoor" element={<Outdoor />} />
      <Route path="/crackers" element={<Crackers />} />
      <Route path="/eventParties" element={<EventParties />} />

      {/* =====================
          PRODUCT DETAILS
      ===================== */}
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/home-product/:slug" element={<HomeProductDetail />} />
      <Route path="/cracker/:slug" element={<CrackerDetail />} />

      {/* =====================
          ADMIN (PRIVATE)
      ===================== */}
      <Route
        path="/admin/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-video"
        element={
          <AdminRoute>
            <AddVideo />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;
