import { Router } from "express";
import {
  createProfile,
  getUserProfile,
  serveImage,
  servePDF,
} from "../../controllers/user/profileController.js";
import uploadSingleFile from "../../utils/multerStorage.js";
import protect from "../../middlewares/authMiddleware/authorization.js";

const router = Router();

router.post("/create-profile", protect, uploadSingleFile, createProfile);
router.get("/user-profile", protect, getUserProfile);
// Route for serving images
router.get("/images/:imageName", serveImage);
// Route for serving PDFs
router.get("/pdfs/:pdfName", servePDF);

export default router;
