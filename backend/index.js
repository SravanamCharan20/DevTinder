import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);
app.use("/profile", profileRouter);

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
