import express from "express";
import cors from "cors";
import morgan from "morgan";
import uploadRoutes from "./routes/uploadRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRoutes);
app.use('/api/share', shareRoutes);

// Health check route
app.get("/ping", (req, res) => {
  res.json({ message: "Server Health is good!" });
});

export default app;
