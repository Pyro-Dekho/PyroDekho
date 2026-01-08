require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");


// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/productRoutes");
const videoRoutes = require("./routes/videoRoutes");
const eventEnquiryRoutes = require("./routes/eventEnquiryRoutes");

// App init
const app = express();

/* ==============================
   GLOBAL MIDDLEWARES
============================== */

// Enable CORS (configure origin in production)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Logging (only in development)


// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// File upload (Cloudinary, images, videos)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  })
);

/* ==============================
   ROUTES
============================== */

app.get("/", (req, res) => {
  res.send("🔥 PyroDekho API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api", eventEnquiryRoutes);

/* ==============================
   ERROR HANDLING
============================== */

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("ERROR 💥", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ==============================
   DATABASE & SERVER
============================== */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
