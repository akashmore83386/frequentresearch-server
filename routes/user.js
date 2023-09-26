import express from "express";
import { signupUser } from "../controllers/userController.js";

const router = express.Router();

// Signup endpoint
router.post("/signup", signupUser);

export default router;