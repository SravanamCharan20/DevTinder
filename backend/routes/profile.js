import express from "express";
import { userAuth } from "../middleware/auth.js";
import { profileEditValidator } from "../utils/validator.js";
import User from "../models/User.js";

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
    await user.save()
    const userData = user.toObject();
    delete userData.password;
    delete userData.email;    
    
    res.json({
        message: `${user.firstName}, your profile updated successfuly`,
        data: userData
      });
  } catch (error) {
    res.send("Error : " + error.message);
  }
});
export default profileRouter;
