// // middleware/auth.js
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// module.exports = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1]; // Bearer <token>
//   if (!token) return res.status(401).json({ message: "Token missing" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     req.userId = decoded.userId; // ✅ must match your login payload
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    
    req.userId = decoded.userId; // ✅ must match login payload
    console.log("Decoded token:", decoded); // ✅ confirms payload
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};