import { useState, useRef } from "react";
import axios from "axios";

export default function UploadForm({ setSummary }) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); 

  const handleFileSelect = (file) => {
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary(""); 

    if (!selectedFile) {
      setSummary("Please upload a file.");
      setLoading(false);
      return;
    }

    if (!prompt.trim()) {
      setSummary("Please enter a prompt.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("prompt", prompt);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setSummary(data.summary || "No summary generated.");
      
      // Reset form for next upload
      setSelectedFile(null);
      setPrompt("");
      
      // KEY FIX: Clear file input to allow new file selection
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
    } catch (error) {
      console.error("Upload Error:", error);
      setSummary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-6 w-full max-w-xl mx-auto bg-gradient-to-br from-white to-indigo-50 p-8 rounded-3xl shadow-xl"
    >
      {/* File Upload Area */}
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:border-indigo-500 transition-all duration-300 bg-white shadow-inner"
      >
        <span className="text-gray-500 font-medium text-lg cursor-pointer">
          {selectedFile ? `📄 ${selectedFile.name}` : "📂 Upload a transcript file"}
        </span>
        <input
          id="fileInput"
          type="file"
          className="hidden cursor-pointer"
          accept=".txt,.md,.doc,.docx,.pdf"
          ref={fileInputRef} // This ref is essential
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
      </label>

      {/* Prompt Input Area */}
      <textarea
        placeholder="Enter summary instruction/prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 placeholder-gray-400 shadow-sm resize-none cursor-text"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Summarizing..." : "Generate Summary"}
      </button>
    </form>
  );
}
