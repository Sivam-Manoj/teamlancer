import asyncHandler from "express-async-handler";
import Profile from "../../models/user/userProfileModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProfile = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    address,
    district,
    postalcode,
    about,
    skills,
    linkedin,
    github,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !address ||
    !district ||
    !postalcode ||
    !about ||
    !skills
  ) {
    res.status(400);
    throw new Error("Please fill in the required fields");
  }
  const exProfile = await Profile.findOne({ user: req.userId });

  if (exProfile) {
    res.status(400);
    throw new Error("profile already created");
  }
  const profile = new Profile({
    user: req.userId,
    image: req.files?.image[0].filename || null,
    imageurl:
      `${process.env.BASE_URL}/profile/images/${req.files?.image[0].filename}` ||
      null,
    firstname,
    lastname,
    address,
    district,
    postalcode,
    about,
    skills,
    linkedin: linkedin || null,
    github: github || null,
    resume: req.files?.pdf[0].filename || null,
    resumeurl:
      `${process.env.BASE_URL}/profile/pdfs/${req.files?.pdf[0].filename}` ||
      null,
    configured: true,
  });

  try {
    await profile.save();
    res.status(201).json({
      message: `${firstname} ${lastname} profile created succesfully`,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Profile creation failed", error);
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    address,
    district,
    postalcode,
    about,
    skills,
    linkedin,
    github,
  } = req.body;
  const userId = req.user;

  const userProfile = await Profile.findOne({ user: userId });

  if (!userProfile) {
    res.status(400);
    throw new Error("user profile not found");
  }

  try {
    await Profile.findByIdAndUpdate(
      userProfile._id,
      {
        image,
        firstname,
        lastname,
        address,
        district,
        postalcode,
        about,
        skills,
        linkedin,
        github,
      },
      { new: true }
    );
    res.status(201).json({ message: "user profile updated succesfully" });
  } catch (error) {
    res.status(500);
    throw new Error("error while updating profile", error);
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await Profile.findOne({ user: id });

  try {
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400);
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("error while finding user");
  }
});

export const serveImage = asyncHandler(async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "uploads",
    "user",
    imageName
  );
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    }
  });
});

export const servePDF = asyncHandler(async (req, res) => {
  const pdfName = req.params.pdfName;
  const pdfPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "uploads",
    "user",
    pdfName
  );

  res.sendFile(pdfPath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("PDF not found");
    }
  });
});
