import { Router } from "express";
import { loginUser, newUser } from "../controllers/auth/authController.js";

const router = Router();

router.post("/register", newUser);
router.post("/login", loginUser);

export default router;
