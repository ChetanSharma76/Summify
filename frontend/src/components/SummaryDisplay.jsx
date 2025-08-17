import { useState, useEffect } from "react";
import ShareModal from "./ShareModal";

const SummaryDisplay = ({ summary }) => {
  const [displaySummary, setDisplaySummary] = useState(summary || "");
  const [editableText, setEditableText] = useState(summary || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    setDisplaySummary(summary || "");
    setEditableText(summary || "");
  }, [summary]);

  const processAndStyleText = (text) => {
    if (!text) return [];

    return text.split('\n').map((line, lineIndex) => (
      <p key={lineIndex} className="text-gray-800 mb-2">
        {line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <span key={partIndex} className="font-bold">
                {part.slice(2, -2)}
              </span>
            );
          }
          return part;
        })}
      </p>
    ));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setDisplaySummary(editableText);
    }
    setIsEditing((prev) => !prev);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  if (!displaySummary && !isEditing) return null;

  return (
    <>
      <div className="mt-6 w-full max-w-3xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📑 Summary</h2>
          <div className="flex space-x-3">
            {/* Share Button */}
            {displaySummary && !isEditing && (
              <button
                onClick={handleShareClick}
                className="px-4 py-2 cursor-pointer text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            )}
            
            {/* Edit/Save Button */}
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 cursor-pointer text-sm font-semibold bg-gray-800 text-white rounded-lg hover:bg-black transition"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="w-full h-72 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none bg-white text-gray-800"
            placeholder="Edit the summary here. Use **text** for bolding."
          />
        ) : (
          <div className="prose max-w-none break-words">
            {processAndStyleText(displaySummary)}
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        summaryText={displaySummary}
      />
    </>
  );
};

export default SummaryDisplay;
