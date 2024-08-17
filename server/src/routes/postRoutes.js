import { Router } from "express";
import {
  addPost,
  getPosts,
  getSinglePost,
} from "../controllers/posts/postController.js";
import protect from "../middlewares/authMiddleware/authorization.js";

const router = Router();

router.post("/add-posts", protect, addPost);
router.get("/get-posts", getPosts);
router.get("/single-post/:id", getSinglePost);

export default router;
