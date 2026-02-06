import express from "express";
import { userAuth } from "../middleware/auth.js";
import { profileEditValidator } from "../utils/validator.js";


const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.send("Error : " + error.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!profileEditValidator(req)) {
      return res.status(400).json({ message: "Invalid fields for update" });
    }

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    const userData = user.toObject();
    delete userData.password;
    delete userData.email;

    res.json({
      message: `${user.firstName}, your profile updated successfuly`,
      data: userData,
    });
  } catch (error) {
    res.send("Error : " + error.message);
  }
});

profileRouter.patch("/forgetPassword", userAuth, async (req, res) => {
  try {
    const { newPass, confNewPass } = req.body;

    if (!newPass || !confNewPass) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPass !== confNewPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const loggedInUser = req.user;
    loggedInUser.password = newPass;

    await loggedInUser.save();
    res.status(200).json({ message: "Password changed successfully!!" });
  } catch (error) {
    res.send("Error : " + error.message);
  }
});
export default profileRouter;
