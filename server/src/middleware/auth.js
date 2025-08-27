import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, "mysecret123"); // use same secret as authController
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
