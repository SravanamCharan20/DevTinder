import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email Address",
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

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const Hashedpassword = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    Hashedpassword
  );

  return isPasswordValid;
};
export default mongoose.model("User", userSchema);
