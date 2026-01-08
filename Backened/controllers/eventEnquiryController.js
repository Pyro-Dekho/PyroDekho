const EventEnquiry = require("../models/EventEnquiry");

/* ===============================
   CREATE EVENT ENQUIRY (PUBLIC)
================================ */
exports.createEventEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      message,
    } = req.body;

    /* ---------- Validation ---------- */
    if (!fullName || !email || !phone || !eventType || !eventDate) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Phone number validation (India friendly)
    if (phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Event date should not be in the past
    if (new Date(eventDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Event date must be in the future",
      });
    }

    /* ---------- Save Enquiry ---------- */
    const enquiry = await EventEnquiry.create({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      phone,
      eventType,
      eventDate,
      message: message?.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("EVENT ENQUIRY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
