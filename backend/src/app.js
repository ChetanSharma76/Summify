import express from "express";
import cors from "cors";
import morgan from "morgan";
import uploadRoutes from "./routes/uploadRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/share", shareRoutes);

// Health check route
app.get("/ping", (req, res) => {
  res.json({ message: "Server Health is good!" });
});

// Root route for Vercel
app.get("/", (req, res) => {
  res.json({ message: "Summify Backend API is running!" });
});

export default app;
