import express from "express";
import { userAuth } from "../middleware/auth.js";
import User from "../models/User.js";
import connectionRequest from "../models/connectionRequest.js";

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  const { status, toUserId } = req.params;

  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(status)) {
    return res
      .status(400)
      .json({ message: `${status} is not a Valid status type!!` });
  }

  const isValidtoUser = await User.findById(toUserId);
  if (!isValidtoUser) {
    return res
      .status(400)
      .json({ message: "the receiver user is not there dude!!" });
  }
  const fromUserId = req.user._id;

  const existingConnectionRequest = await connectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingConnectionRequest) {
    return res
      .status(400)
      .send({ message: "Connection Request Already Exists!!" });
  }

  const connectionRequests = new connectionRequest({
    fromUserId,
    toUserId,
    status,
  });

  const data = await connectionRequests.save();
  await data.populate([
    {
      path: "fromUserId",
      select: "firstName lastName",
    },
    {
      path: "toUserId",
      select: "firstName lastName",
    },
  ]);

  res.status(201).json({
    message: `${req.user.firstName} marked ${isValidtoUser.firstName} as ${status}`,
    data,
  });
});

export default requestRouter;
