import express from 'express'
import { userAuth } from "../middleware/auth.js";

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (error) {
      res.send("Error : " + error.message);
    }
  });

export default profileRouter;