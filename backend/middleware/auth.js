import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedUser = await jwt.verify(token, "$uperman@123");
    const { _id } = decodedUser;

    const user = await User.findById({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not Found!!" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.send("Error : " + error.message);
  }
};
