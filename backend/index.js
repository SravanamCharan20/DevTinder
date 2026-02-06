import express from "express";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import { signupValidator } from "./utils/validator.js";
import validator from "validator";

const app = express();
app.use(express.json());

app.post("/user/signup", async (req, res) => {
  try {
    signupValidator(req);
    const { firstName, lastName, password, email } = req.body;
    const ExistedUser = await User.findOne({ email });
    if (ExistedUser) {
      return res.status(400).json({ message: "Email Already Exist!!" });
    }

    const Hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      password: Hashedpassword,
      email,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User Created Successfully", userData: savedUser });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.post("/user/signin", async (req, res) => {
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

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExistedUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Enter correct password!!" });
    }

    res.status(200).json({ message: "User logged in successfully!!" });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB Connection Successfully...");
    app.listen("6969", () => {
      console.log("Server Listening at 6969...");
    });
  })
  .catch((err) => {
    console.error("err while db connection");
  });
