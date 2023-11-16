import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB CONNECTED");
  } catch (error) {
    console.log("ERROR ON DB CONNECTION");
    process.exit(0);
  }
};

export default connectDb;
