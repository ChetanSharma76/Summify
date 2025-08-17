import dotenv from "dotenv";
dotenv.config();

import express from "express";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const { default: app } = await import("./src/app.js"); 
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
