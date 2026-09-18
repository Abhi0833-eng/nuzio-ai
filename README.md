# 🎙️ Nuzio AI - Personalized Audio News & AI Intelligence

> **Full-Stack Developer Assignment Submission for Olinp**
> Developed by **Abhishek Gupta** ([@Abhi0833-eng](https://github.com/Abhi0833-eng))

---

## 🌟 Overview

**Nuzio AI** is an interactive, personalized audio news platform that delivers real-time AI-summarized news briefings, speech synthesis audio playback, live synchronized transcripts, category filtering, and an interactive "Ask AI" news assistant.

---

## ✨ Features

- **Full-Stack Architecture**: React + Vite + Tailwind CSS frontend with a Node.js + Express REST API backend.
- **Authentication & Personalization**: JWT token login/registration with preferences setup for news topics, AI summary depths, and speech rates. Includes a 1-click **Demo Auto-Fill** button (`demo@nuzio.ai`).
- **Personalized News Deck**: Hero briefing banner and a responsive grid of curated AI news cards with sentiment badges and bullet key takeaways.
- **Interactive Audio Player**: Real-time Web Speech API audio synthesis, animated waveform visualizer, synchronized live transcript drawer, and 0.75x–2.0x playback speed controls.
- **Ask AI News Assistant**: Interactive slide-over modal for contextual Q&A on any news article.

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Abhi0833-eng/nuzio-ai.git
cd nuzio-ai
```

### 2. Start the Backend API (Port 5000)
```bash
cd backend
npm install
npm start
```

### 3. Start the Frontend App (Port 5173)
```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to explore the application!

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS v4, Lucide Icons, Web Speech API
- **Backend**: Node.js, Express, CORS, JSONWebToken
- **Deployment**: Vercel Serverless Ready

---

## 📡 API Endpoints

- `GET /api/health` — Backend health check
- `POST /api/auth/login` — User authentication
- `POST /api/auth/register` — User registration
- `GET /api/user/profile` — Fetch user profile & preferences
- `PUT /api/user/preferences` — Update news preferences
- `GET /api/news/personalized` — Fetch personalized news feed
- `POST /api/news/article/:id/like` — Toggle story like
- `POST /api/news/article/:id/bookmark` — Toggle story bookmark
- `POST /api/news/ask-ai` — Ask AI contextual assistant
