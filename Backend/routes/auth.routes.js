const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const googleClient = require("../config/google")
const user = require("../models/User")


const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  googleAuthentication,
  googleCallback,
  getCurrentUser,
  logout
} = require("../controllers/auth.controller");


router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


router.get("/google", googleAuthentication);
router.get("/google/callback",googleCallback)


router.get("/me",getCurrentUser)
router.post("/logout", logout)




module.exports = router;
