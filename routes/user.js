import express from "express";
import { getUser } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

// Protect the user route with authentication middleware
router.get("/", authenticateToken, getUser);

export default router;
