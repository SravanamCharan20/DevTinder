import express from "express";
import connectDB from "./config/db.js";

const app = express();

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
