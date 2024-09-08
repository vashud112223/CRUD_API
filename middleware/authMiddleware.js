const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// const JWT_SECRET = "PAASWORD_KEY"
console.log(process.env.JWT_SECRET);
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
