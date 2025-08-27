import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import travelRoutes from "./src/routes/travelRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.LIVE_URL;

const allowedOrigins = [
  "http://localhost:3000",
  "https://travelmate10.netlify.app",
  "https://68aed92a68a50f179084aac4--travelmate10.netlify.app"  // ✅ Add your actual Netlify URL
];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    console.log("Request origin:", origin);
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list OR matches Netlify pattern
    if (allowedOrigins.includes(origin) || 
        origin.includes('travelmate10.netlify.app')) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Routes
app.get("/", (req, res) =>
  res.json({ status: "OK", service: "TravelMate+ API" })
);

app.use("/api/auth", authRoutes);
app.use("/api/travel", travelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: err.message
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Connect DB + Start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 API running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  });