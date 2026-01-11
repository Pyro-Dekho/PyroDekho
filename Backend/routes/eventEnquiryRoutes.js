const express = require("express");

const router = express.Router();
const {
  createEventEnquiry,
} = require("../controllers/eventEnquiryController");
const { createEnquiry } = require("../controllers/enquiryController");

router.post("/enquiry", createEnquiry);

router.post("/Eventenquiry", createEventEnquiry);


module.exports = router;
