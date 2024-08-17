import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectory = path.resolve(__dirname, "../../uploads/user");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedPdfMimeType = "application/pdf";

  if (
    (allowedImageExtensions.includes(fileExtension) &&
      allowedImageMimeTypes.includes(mimeType)) ||
    mimeType === allowedPdfMimeType
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files or PDFs are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const uploadSingleFile = (req, res, next) => {
  const uploadFiles = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]);
  uploadFiles(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default uploadSingleFile;
