import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import chatRoutes from "./routes/chatRoute.js";
import dbConnection from "./config/dbConnection.js";

dotenv.config();


const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"))

// Routes
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀🚀`);
  });
});