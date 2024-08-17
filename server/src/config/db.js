import mongoose from "mongoose";

export const Db = async () => {
  const port = process.env.MONGO_URL;
  try {
    await mongoose.connect(port);
    console.log("database connected succesfully");
  } catch (error) {
    console.log(`error while connecting to database: ${error}`);
  }
};
