const router = require("express").Router();
const { uploadVideo, getVideos } = require("../controllers/videoController");
const {verifyToken,isAdmin} = require('../middleware/authMiddleware')

router.post("/upload", verifyToken, isAdmin, uploadVideo);

router.get("/", getVideos);

module.exports = router;
