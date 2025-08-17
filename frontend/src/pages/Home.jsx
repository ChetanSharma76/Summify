import UploadForm from "../components/UploadForm";
import SummaryDisplay from "../components/SummaryDisplay";
import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl pb-2 font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
          Summify
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Your AI-powered meeting & document summarizer ✨
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-10">
        {/* Upload Form with prompt input */}
        <UploadForm setSummary={setSummary} />

        {/* Display AI-generated summary */}
        {summary && <SummaryDisplay summary={summary} />}
      </main>
    </div>
  );
}
