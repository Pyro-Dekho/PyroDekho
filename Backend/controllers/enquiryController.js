const Enquiry = require("../models/Enquiry");

/* ===============================
   CREATE ENQUIRY (PUBLIC)
================================ */
exports.createEnquiry = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    /* ---------- Validation ---------- */
    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and address are required",
      });
    }

    // Phone validation (basic)
    if (phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    /* ---------- Save Enquiry ---------- */
    const enquiry = await Enquiry.create({
      name: name.trim(),
      phone,
      address: address.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry saved successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("ENQUIRY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
