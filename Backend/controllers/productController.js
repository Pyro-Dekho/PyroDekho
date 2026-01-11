const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

/* ===============================
   GET PRODUCTS (CATEGORY FILTER)
================================ */
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category)
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   GET PRODUCT BY SLUG
================================ */
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   HOME PAGE GROUPED PRODUCTS
   (OPTIMIZED WITH Promise.all)
================================ */
exports.getHomeProducts = async (req, res) => {
  try {
    const categories = [
      "mostSearched",
      "smokeless",
      "event",
      "club",
      "wedding",
      "stage",
      "birthday",
      "fog",
    ];

    const queries = categories.map((cat) =>
      Product.find({ category: cat }).sort({ createdAt: -1 })
    );

    const results = await Promise.all(queries);

    const response = {};
    categories.forEach((cat, index) => {
      response[cat] = results[index];
    });

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("HOME PRODUCTS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      availability,
      delivery,
      safety,
      spark,
      burnTime,
      sparkHeight,
      smoke,
    } = req.body;

    /* ---------- Validation ---------- */
    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, price and category are required",
      });
    }

    if (isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number",
      });
    }

    /* ---------- Unique Slug ---------- */
    const baseSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
    let slug = baseSlug;
    let count = 1;

    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    /* ---------- Image Upload ---------- */
    let imageUrl = "";
    if (req.files?.image) {
      const imageFile = req.files.image;

      const uploadResult = await cloudinary.uploader.upload(
        imageFile.tempFilePath,
        { folder: "pyro/products" }
      );

      imageUrl = uploadResult.secure_url;
    }

    /* ---------- Save Product ---------- */
    const product = await Product.create({
      title: title.trim(),
      slug,
      price,
      category,
      image: imageUrl,
      technical: {
        availability,
        delivery,
        safety,
        spark,
        burnTime,
        sparkHeight,
        smoke,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
