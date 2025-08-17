# Summify - AI-Powered Meeting Notes Summarizer

**Summify** is a full-stack web application that lets you upload meeting transcripts or documents, input custom summarization instructions, and instantly generates concise, action-oriented summaries using AI. You can edit the summary and share it via email with professional HTML formatting.

---

## Features

- **Upload documents/transcripts** (TXT, PDF, DOC, DOCX, MD)
- **Custom prompt for summary** (e.g., "Extract only action items")
- **Instant AI-generated summary**
- **Edit summary before sharing**
- **Share summary via email** (easy, professional template)

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Nodemailer, Multer
- **AI Service:** Groq API (can swap with any LLM provider)

---

## Getting Started

1. **Clone the repo**

git clone https://github.com/yourusername/summify.git
cd Summify

text
2. **Install dependencies**

- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

3. **Configure environment variables**

- Create `.env` files in both `backend` and `frontend` folders (see example in code and docs).

4. **Run Development Servers**

- Backend: `npm run dev`
- Frontend: `npm run dev`

5. **Open the app**

- Frontend runs at: http://localhost:5173
- backend runs at: http://localhost:5000
- these are for locally running the project else the deployed link is already present below.

---

## Usage

1. **Upload your transcript/document file**
2. **Enter a custom instruction/prompt**
3. **Click "Generate Summary"**
4. **Edit the summary if you wish**
5. **Share the summary by entering a recipient email**

---

## Deployment

- Will be available at: _[your deployed link here]_

---

_Built for streamlining team communication and saving time!_
