// app.js - Main application setup
import express from "express";
import connectDB from "./mongoose.js";
import cors from "cors";
import userRouter from "./routes/user.js";

const app = express();

// Middleware setup
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Use the Mongoose connection setup
connectDB();

// Define routes
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});