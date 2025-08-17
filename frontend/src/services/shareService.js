import axios from "axios";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const shareViaEmail = async (
  recipientEmail,
  summaryText,
  senderName = ""
) => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/email`,
      {
        recipientEmail: recipientEmail.trim(),
        summaryText,
        senderName: senderName.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Share API error:", error);

    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || "Server error occurred",
      };
    } else if (error.request) {
      return {
        success: false,
        error: "No response from server. Please check your connection.",
      };
    } else {
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }
};
