import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import Travel from '../models/Travel.js';
import User from '../models/User.js';

export const addDestination = async (req, res) => {
  try {
    const doc = await Travel.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getDestinations = async (req, res) => {
  try {
    const q = { userId: req.user.id };
    if (typeof req.query.visited !== 'undefined') q.visited = req.query.visited === 'true';
    const list = await Travel.find(q).sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid ID' });
    const doc = await Travel.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const markVisited = async (req, res) => {
  try {
    const { notes, actualSpent } = req.body;
    const update = { visited: true };
    if (typeof notes === 'string') update.notes = notes;
    if (typeof actualSpent !== 'undefined') update.actualSpent = actualSpent;
    const doc = await Travel.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const doc = await Travel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getSharedDestinations = async (req, res) => {
  try {
    const { shareId } = req.params;
    const user = await User.findOne({ shareId });
    if (!user || !user.shareEnabled) return res.status(404).json({ success: false, message: 'Share link not active' });
    const list = await Travel.find({ userId: user._id }).sort({ createdAt: -1 }).select('-userId');
    res.json({ success: true, owner: { name: user.name }, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const budgetSummary = async (req, res) => {
  try {
    const agg = await Travel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
          _id: null,
          plannedTotal: { $sum: { $ifNull: ['$plannedBudget', 0] } },
          actualTotal: { $sum: { $ifNull: ['$actualSpent', 0] } }
      }}
    ]);
    const summary = agg[0] || { plannedTotal: 0, actualTotal: 0 };
    summary.savings = (summary.plannedTotal || 0) - (summary.actualTotal || 0);
    res.json({ success: true, data: summary });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
