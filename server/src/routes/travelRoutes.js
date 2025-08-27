import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addDestination,
  getDestinations,
  updateDestination,
  markVisited,
  deleteDestination,
  getSharedDestinations,
  budgetSummary,
} from "../controllers/travelController.js";

const router = Router();

// 🔒 Protected Routes (require login)
router.post("/", auth, addDestination);
router.get("/", auth, getDestinations);
router.put("/:id", auth, updateDestination);
router.put("/:id/visited", auth, markVisited);
router.delete("/:id", auth, deleteDestination);

// 🔒 Budget summary
router.get("/budget/summary", auth, budgetSummary);

// 🌍 Public Routes (no login needed)
router.get("/shared/:shareId", getSharedDestinations);

export default router;
