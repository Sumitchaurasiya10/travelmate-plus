import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  placeName: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  plannedBudget: { type: Number, min: 0, default: 0 },
  actualSpent: { type: Number, min: 0, default: 0 },
  visited: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  photo: { type: String, default: '' },
  publicShareId: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Extra fields from your form
  startDate: { type: String },
  endDate: { type: String },
  travelType: { type: String, default: "Relaxation" },
  priority: { type: String, default: "Medium" },
  accommodation: { type: String },
  transport: { type: String },
  companions: { type: String, default: "Solo" }
}, { timestamps: true });

travelSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Travel', travelSchema);
