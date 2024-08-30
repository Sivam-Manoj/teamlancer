import pkg from "jsonwebtoken";

const { sign } = pkg;

const createToken = (id, res, next) => {
  try {
    const payload = { id };
    const token = sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(401).json({
      message: "error while creating token",
    });
  }
};

export default createToken;
