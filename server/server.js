import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDatabase } from "./database/connect.database.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
connectDatabase();

// Routes
import studentRoutes from "./routes/student.routes.js";
import learnRoutes from "./routes/learn.routes.js";

app.use("/api/students", studentRoutes);
app.use("/api/learn", learnRoutes);

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
