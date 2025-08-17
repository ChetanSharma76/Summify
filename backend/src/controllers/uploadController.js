import fs from "fs";
import { summarizeText } from "../services/aiService.js";

export const handleFileUpload = async (req, res) => {

  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Read file contents
    const transcript = fs.readFileSync(req.file.path, "utf-8");

    // Summarize
    const summary = await summarizeText(transcript, prompt);

    res.json({
      filename: req.file.filename,
      summary,
    });
  } catch (error) {
    console.error("Upload Summarize Error:", error);
    res.status(500).json({ error: "Failed to process uploaded file" });
  }
};
