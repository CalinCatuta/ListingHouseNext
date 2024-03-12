import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  // only the fields that are specified in our schema is saved in database
  mongoose.set("strictQuery", true);
  //   if the db is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }
  //   Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
