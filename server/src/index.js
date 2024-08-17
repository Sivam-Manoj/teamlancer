import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Db } from "./config/db.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/user/profileRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Use CORS with specified options

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//database
Db();

// Routes
app.use("/posts", postRoutes);
app.use("/user", authRoutes);
app.use("/profile", profileRoutes);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

//view static frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
  });
}

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
