import { Router } from "express";
import {
  getUserId,
  loginUser,
  logout,
  newUser,
} from "../controllers/auth/authController.js";
import protect from "../middlewares/authMiddleware/authorization.js";

const router = Router();

router.post("/register", newUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/get-user-id", protect, getUserId);

export default router;
