import { Router } from "express";
import {
  addPost,
  deletePost,
  getPostByUserId,
  getPosts,
  getProposalById,
  getProposalByUserId,
  getSinglePost,
  getUserDetailsById,
  sendProposal,
} from "../controllers/posts/postController.js";
import protect from "../middlewares/authMiddleware/authorization.js";

const router = Router();

router.post("/add-posts", protect, addPost);
router.get("/get-posts", getPosts);
router.get("/single-post/:id", getSinglePost);
router.post("/send-proposal/:id", protect, sendProposal);
router.get("/get-proposal", protect, getProposalByUserId);
router.get("/get-user-posts", protect, getPostByUserId);
router.get("/get-user-proposals/:id", protect, getProposalById);
router.get("/get-user-details/:id", protect, getUserDetailsById);
router.delete("/delete-post/:id", protect, deletePost);
export default router;
