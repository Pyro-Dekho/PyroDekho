const cloudinary = require("../config/cloudinary");
const Video = require("../models/Video");

/* ===============================
   UPLOAD VIDEO (ADMIN)
================================ */
exports.uploadVideo = async (req, res) => {
  try {
    const { title, type } = req.body;

    /* ---------- Validation ---------- */
    if (!title || !type) {
      return res.status(400).json({
        success: false,
        message: "Title and type are required",
      });
    }

    if (!req.files || !req.files.video) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    const videoFile = req.files.video;

    /* ---------- Upload to Cloudinary ---------- */
    const uploadResult = await cloudinary.uploader.upload(
      videoFile.tempFilePath,
      {
        resource_type: "video",
        folder: "pyro/videos",
      }
    );

    if (!uploadResult?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Video upload failed",
      });
    }

    /* ---------- Save to DB ---------- */
    const video = await Video.create({
      title: title.trim(),
      type,
      videoUrl: uploadResult.secure_url,
    });

    /* ---------- Response ---------- */
    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: video,
    });
  } catch (error) {
    console.error("UPLOAD VIDEO ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ===============================
   GET VIDEOS (PUBLIC)
================================ */
exports.getVideos = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const videos = await Video.find(filter)
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    console.error("GET VIDEOS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
