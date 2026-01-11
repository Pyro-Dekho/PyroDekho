import { useState } from "react";
import toast from "react-hot-toast";
import "../styles/addProduct.css";

const API = import.meta.env.VITE_API_BASE_URL;

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    availability: "",
    delivery: "",
    safety: "",
    spark: "",
    burnTime: "",
    sparkHeight: "",
    smoke: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle text input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle file
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createProduct = async () => {
    /* =====================
       VALIDATION
    ===================== */
    if (!form.title || !form.price || !form.category) {
      toast.error("Title, price, and category are required ❗");
      return;
    }

    if (!image) {
      toast.error("Please upload a product image 🖼️");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating product...");

    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("price", form.price);
      fd.append("category", form.category);

      // technical fields
      fd.append("availability", form.availability);
      fd.append("delivery", form.delivery);
      fd.append("safety", form.safety);
      fd.append("spark", form.spark);
      fd.append("burnTime", form.burnTime);
      fd.append("sparkHeight", form.sparkHeight);
      fd.append("smoke", form.smoke);

      fd.append("image", image);

      const res = await fetch(`${API}/products/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Product creation failed");
      }

      toast.success("Product created successfully ✅", { id: toastId });

      // reset form
      setForm({
        title: "",
        price: "",
        category: "",
        availability: "",
        delivery: "",
        safety: "",
        spark: "",
        burnTime: "",
        sparkHeight: "",
        smoke: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h2 className="add-product-title">Add New Product</h2>
        <p className="add-product-subtitle">
          Upload product details & image
        </p>

        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product title"
        />

        <label>Price *</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price in ₹"
        />

        <label>Category *</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Indoor / Outdoor / Crackers"
        />

        <div className="tech-grid">
          <input name="availability" placeholder="Availability" value={form.availability} onChange={handleChange} />
          <input name="delivery" placeholder="Delivery" value={form.delivery} onChange={handleChange} />
          <input name="safety" placeholder="Safety" value={form.safety} onChange={handleChange} />
          <input name="spark" placeholder="Spark" value={form.spark} onChange={handleChange} />
          <input name="burnTime" placeholder="Burn Time" value={form.burnTime} onChange={handleChange} />
          <input name="sparkHeight" placeholder="Spark Height" value={form.sparkHeight} onChange={handleChange} />
          <input name="smoke" placeholder="Smoke" value={form.smoke} onChange={handleChange} />
        </div>

        <label>Product Image *</label>
        <input type="file" onChange={handleImageChange} />

        <button onClick={createProduct} disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
