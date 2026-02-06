import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from './routes/requests.js'
import connectionsRouter from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", connectionsRouter);

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
