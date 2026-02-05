import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devtinder:devtinder@cluster0.8wdxlg0.mongodb.net/?appName=Cluster0"
  );
};

export default connectDB;