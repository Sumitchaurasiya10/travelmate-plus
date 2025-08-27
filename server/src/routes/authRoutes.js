import { Router } from 'express';
// import { register, login, toggleShare } from '../controllers/authController.js'; // Comment this out temporarily
import auth from '../middleware/auth.js';

const router = Router();

// Temporary test functions
const testRegister = (req, res) => {
  console.log("Register route hit:", req.body);
  res.json({ success: true, message: "Register route working", data: req.body });
};

const testLogin = (req, res) => {
  console.log("Login route hit:", req.body);
  res.json({ success: true, message: "Login route working", data: req.body });
};

const testToggleShare = (req, res) => {
  console.log("Toggle share route hit");
  res.json({ success: true, message: "Toggle share route working" });
};

// Use test functions temporarily
router.post('/register', testRegister);
router.post('/login', testLogin);
router.put('/toggle-share', auth, testToggleShare);

export default router;