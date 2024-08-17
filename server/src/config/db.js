import mongoose from "mongoose";
import "dotenv/config";

export const Db = async () => {
  const port = process.env.MONGO_URL;
  try {
    await mongoose.connect(port);
    console.log("database connected succesfully");
  } catch (error) {
    console.log(`error while connecting to database: ${error}`);
  }
};
