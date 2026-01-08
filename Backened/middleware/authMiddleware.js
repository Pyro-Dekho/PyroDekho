const jwt = require("jsonwebtoken");
const { ADMIN_EMAILS } = require("../config/admin");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, name }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!ADMIN_EMAILS.includes(req.user.email)) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
