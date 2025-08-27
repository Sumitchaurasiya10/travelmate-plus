import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './src/routes/authRoutes.js';
import travelRoutes from './src/routes/travelRoutes.js';

const app = express();

// Hardcoded configs
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/travelmate_plus"; // change if using Atlas
const CLIENT_ORIGIN = ["http://localhost:3000"]; // frontend React app

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

// 🚀 Fix: increase body size limit (e.g. 10mb, change as needed)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ status: 'OK', service: 'TravelMate+ API' }));

app.use('/api/auth', authRoutes);
app.use('/api/travel', travelRoutes);

// Connect to DB and start server
mongoose
  .connect(MONGO_URI, { dbName: 'travelmate_plus' })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });
