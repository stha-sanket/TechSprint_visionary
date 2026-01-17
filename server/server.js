import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
import studentRoutes from "./routes/student.routes.js";
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
