import express from "express";
import { signupValidator } from "../utils/validator.js";
import validator from "validator";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    signupValidator(req);
    const { email } = req.body;
    const ExistedUser = await User.findOne({ email });
    if (ExistedUser) {
      return res.status(400).json({ message: "Email Already Exist!!" });
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User Created Successfully", userData: savedUser });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email!!" });
    }

    const isExistedUser = await User.findOne({ email });
    if (!isExistedUser) {
      return res
        .status(404)
        .json({ message: "Email not found please signup!!" });
    }

    const isPasswordCorrect = await isExistedUser.validatePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Enter correct password!!" });
    }

    const token = await isExistedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.status(200).json({ message: "User logged in successfully!!" });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logout successfully!!" });
});


export default authRouter;
