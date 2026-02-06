import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isStrongPassword(value);
        },
        message: "Enter a strong password",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address: " + value);
        }
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "this is a Default About",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
