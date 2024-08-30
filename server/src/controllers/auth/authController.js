import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import createToken from "../../utils/createToken.js";

export const newUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !password || !mobile) {
    throw new Error("please fill required fields");
  }
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error("user already registered, please login");
  }
  const user = new User({
    name,
    email,
    mobile,
    password,
  });
  try {
    await user.save();
    createToken(user._id, res);
    res
      .status(200)
      .json({
        user: user._id,
        message: `user ${user.name} registered successfully`,
      });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please fill required fields");
  }

  const existUser = await User.findOne({ email });

  if (!existUser) {
    res.status(400);
    throw new Error("user not registered");
  }
  try {
    if (existUser && (await existUser.checkPassword(password))) {
      createToken(existUser._id, res);

      const { password, ...userWithoutPassword } = existUser._doc;

      res.status(200).json({
        user: userWithoutPassword,
        message: `User ${existUser.name} logged in successfully`,
      });
    } else {
      res.status(400);
      throw new Error("user credentials invalid");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(204).json({ message: "User logout successful" });
});

export const getUserId = asyncHandler(async (req, res) => {
  const id = req.userId;
  console.log(id);
  if (!id) {
    res.status(404);
    throw new Error("ID not found");
  }
  res.status(200).send(id.toString());
});
