import express from "express";
import { connectDb } from "../config/dbConenction.js";
import cors from "cors"
// *********** All-Routes *************
import auth from "../routes/auth.routes.js";
import user from "../routes/user.routes.js";
// *********** All-Routes *************

import cookieParser from "cookie-parser";
const app = express();

await connectDb();

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// Use cors middleware
app.use(
  cors({
    origin: "https://mern-test-frontend-smoky.vercel.app", // Replace with the frontend's URL (React app)
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************

app.get("/", (req, res) => {
  res.json("I'm coming from backend");
});
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// for wrong apis
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the URL and try again.",
  });
});

// Error handling middleware (optional, for other server errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});

export default (req, res) => {
  return app(req, res);
}