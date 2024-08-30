import { Router } from "express";
import {
  createProfile,
  getProfileById,
  getUserProfile,
  getUserProfileById,
  serveImage,
  servePDF,
  updateProfile,
} from "../../controllers/user/profileController.js";
import uploadSingleFile from "../../utils/multerStorage.js";
import protect from "../../middlewares/authMiddleware/authorization.js";

const router = Router();

router.post("/create-profile", protect, uploadSingleFile, createProfile);
router.get("/user-profile", protect, getUserProfile);
router.get("/user-details/:id", protect, getUserProfileById);
router.get("/get-profile/:id", protect, getProfileById);
router.put("/update-profile", protect, uploadSingleFile, updateProfile);
// Route for serving images
router.get("/images/:imageName", serveImage);
// Route for serving PDFs
router.get("/pdfs/:pdfName", servePDF);

export default router;
