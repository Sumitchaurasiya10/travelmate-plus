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
const PORT = process.env.PORT || 5000;   // ✅ uppercase
const MONGO_URI = process.env.LIVE_URL;  
const CLIENT_ORIGIN = [
  "http://localhost:3000",
  "https://travelmate10.netlify.app"   // ✅ your Netlify domain
];

// Middleware
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}));

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
