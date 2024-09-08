// generateToken.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
console.log(process.env.JWT_SECRET)
const token = jwt.sign({ id: "testUser" }, process.env.JWT_SECRET, { expiresIn: "1h" });
console.log("Generated Token:", token);
