import mongoose from "mongoose";


export const Db = async () => {
  const mongo_url = process.env.MONGO_URL;
  try {
    await mongoose.connect(mongo_url);
    console.log("database connected succesfully");
  } catch (error) {
    console.log(`error while connecting to database: ${error}`);
  }
};
