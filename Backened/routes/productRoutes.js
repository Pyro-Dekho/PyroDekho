const router = require("express").Router();
const {
  getProducts,
  getProductBySlug,
  getHomeProducts,
  createProduct,
} = require("../controllers/productController");

const {verifyToken,isAdmin} = require('../middleware/authMiddleware')

router.get("/home", getHomeProducts);
router.get("/", getProducts);           // ?category=
router.get("/:slug", getProductBySlug); // ✅ single route
router.post("/create", verifyToken, isAdmin, createProduct);


module.exports = router;
