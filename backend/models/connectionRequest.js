import mongoose from "mongoose";
import User from "./User.js";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "User",
    },
    status: {
      type: "String",
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "Enter Valid Status Type",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("connectionRequest", connectionRequestSchema);
