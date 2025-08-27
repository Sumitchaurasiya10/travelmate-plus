import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import travelRoutes from "./src/routes/travelRoutes.js";

// Load .env variables
dotenv.config();

const app = express();

// Configs
const PORT = process.env.PORT || 5000;   // ✅ use uppercase PORT
const MONGO_URI = process.env.LIVE_URL;  // from .env

// ✅ Debug log allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://travelmate10.netlify.app"   // must match your actual Netlify URL exactly
];

// ✅ CORS setup
app.use(cors({
  origin: function (origin, callback) {
    console.log("🌍 Incoming request origin:", origin); // debug log
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked by CORS:", origin);
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

// ✅ Extra headers for OPTIONS & 204 cases
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) =>
  res.json({ status: "OK", service: "TravelMate+ API" })
);
app.use("/api/auth", authRoutes);
app.use("/api/travel", travelRoutes);

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
