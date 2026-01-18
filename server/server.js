import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDatabase } from "./database/connect.database.js";

import studentRoutes from "./routes/student.routes.js";
import learnRoutes from "./routes/learn.routes.js";
import geminiRoutes from "./routes/gemini.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/learn", learnRoutes);
app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME}`);
});

// Start Server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
