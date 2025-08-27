import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../models/User.js";

const sign = (user) =>
  jwt.sign({ id: user._id, email: user.email }, "mysecret123", { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    const user = await User.create({
      name,
      email,
      password,
      shareId: nanoid(8),
    });
    const token = sign(user);
    res
      .status(201)
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          shareId: user.shareId,
          shareEnabled: user.shareEnabled,
        },
      });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const match = await user.comparePassword(password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    const token = sign(user);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shareId: user.shareId,
        shareEnabled: user.shareEnabled,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const toggleShare = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user.shareEnabled = !user.shareEnabled;
    await user.save();
    res.json({
      success: true,
      shareEnabled: user.shareEnabled,
      shareId: user.shareId,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
