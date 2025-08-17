import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const { default: app } = await import("./src/app.js");

  if (process.env.NODE_ENV !== "production") {
    // Local development: run with Express listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }

  // Always return app (needed by Vercel)
  return app;
};

// Export the app directly for Vercel
export default await startServer();
