import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper: Split text into chunks by approx character count
function chunkText(text, maxLength = 2000) {
  const paragraphs = text.split("\n");
  const chunks = [];
  let currentChunk = "";

  for (let para of paragraphs) {
    if ((currentChunk + "\n" + para).length > maxLength) {
      chunks.push(currentChunk);
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? "\n" : "") + para;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  return chunks;
}

export const summarizeText = async (transcript, prompt) => {
  try {
    const chunks = chunkText(transcript, 2000);

    // Step 1: Summarize chunks in parallel
    const chunkPromises = chunks.map((chunk) =>
      client.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct", 
        messages: [
          {
            role: "system", 
            content: `You are an expert AI meeting assistant specialized in analyzing and summarizing various types of documents and transcripts.

          Your primary responsibilities:
          - Analyze uploaded text files (meeting transcripts, call notes, documents, etc.)
          - Generate clear, structured summaries based on user-provided instructions
          - Adapt your summarization style to match specific user requirements
          - Extract key information like decisions, action items, participants, and important discussions
          - Present information in a professional, organized format using markdown when appropriate

          Guidelines for summarization:
          - Always follow the user's custom prompt instructions precisely
          - Use **bold text** to highlight important points, names, dates, and key decisions
          - Structure your response with clear sections and bullet points when appropriate
          - Focus on actionable insights and key takeaways
          - Maintain professional tone while being concise and informative
          - If the user asks for specific formats (bullet points, executive summary, action items only), follow that format exactly

          Remember: Your summaries will be shared via email, so ensure they are:
          - Professional and well-formatted
          - Easy to read and understand
          - Actionable and valuable for recipients
          - Properly structured with clear sections

          Always prioritize clarity, accuracy, and usefulness in your responses.`
          },

          { role: "user", content: `${prompt}\n\nTranscript:\n${chunk}` },
        ],
        temperature: 0.5,
        max_tokens: 300,
      })
    );

    // Wait for all chunks to finish
    const chunkResponses = await Promise.all(chunkPromises);

    // Step 2: Extract text from each chunk in order
    const chunkSummaries = chunkResponses.map(
      (res) => res.choices[0].message.content.trim()
    );

    const combinedSummary = chunkSummaries.join("\n\n");

    // Step 3: Optional final summarization for coherence
    const finalResponse = await client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { role: "system", content: "You are a helpful AI meeting assistant." },
        {
          role: "user",
          content: `${prompt}\n\nSummarize the following combined summaries for clarity and conciseness:\n${combinedSummary}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    return finalResponse.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("AI summarization failed");
  }
};
