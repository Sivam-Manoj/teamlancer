import mongoose from "mongoose";
import express from "express";

export const Db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected succesfully");
  } catch (error) {
    console.log(`error while connecting to database: ${error}`);
  }
};
