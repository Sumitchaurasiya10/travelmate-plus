import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret123";

// ✅ Helper function to sign JWT
const sign = (user) =>
  jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

// ✅ Register Controller
export const register = async (req, res) => {
  try {
    console.log("📩 Register request body:", req.body);

    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ success: false, message: "Email already registered" });

    const user = await User.create({
      name,
      email,
      password,
      shareId: nanoid(8),
    });

    const token = sign(user);

    res.status(201).json({
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
    console.error("❌ Register error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  try {
    console.log("📩 Login request body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("🔍 Found user:", user);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

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
    console.error("❌ Login error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// ✅ Toggle Share Controller
export const toggleShare = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.shareEnabled = !user.shareEnabled;
    await user.save();

    res.json({
      success: true,
      shareEnabled: user.shareEnabled,
      shareId: user.shareId,
    });
  } catch (e) {
    console.error("❌ Toggle share error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};
