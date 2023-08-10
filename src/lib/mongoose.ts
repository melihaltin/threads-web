import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("Already connected to MongoDB");

  try {
    let mongoURL = process.env.MONGODB_URL;
    // console.log(mongoURL);
    await mongoose.connect(mongoURL);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
