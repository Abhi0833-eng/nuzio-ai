# 🎙️ Nuzio AI — Personalized Audio News & Intelligence Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Full-Stack Developer Role Submission — Olinp**  
> Developed by **Abhishek Gupta** | CSE Final Year | Full Stack + AI Engineer  
> GitHub: [@Abhi0833-eng](https://github.com/Abhi0833-eng)

---

## 🚀 Live Demo & Repository

- **GitHub Repository**: [https://github.com/Abhi0833-eng/nuzio-ai](https://github.com/Abhi0833-eng/nuzio-ai)
- **Local Application URL**: `http://localhost:5173`
- **Backend API Base**: `http://localhost:5000`

---

## ⚡ Key Highlights & Architecture

**Nuzio AI** is a next-generation news platform engineered for personalized audio briefings, dynamic text-to-speech synthesis, real-time transcripts, AI bullet summaries, and interactive context Q&A.

```
nuzio-ai/
├── backend/                  # Node.js + Express REST API
│   ├── server.js             # Server Entry & Route Definitions
│   ├── routes/
│   │   ├── auth.js           # User JWT Authentication & Preferences
│   │   └── news.js           # Personalized News Feed, Likes, Bookmarks & Ask AI
│   └── data/
│       └── mockNews.js       # Curated AI News Dataset with Audio Transcripts
├── frontend/                 # React + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── App.jsx           # Main Container & Reactive State Engine
│   │   ├── index.css         # Custom Glassmorphism Dark Mode Design System
│   │   └── components/
│   │       ├── Navbar.jsx           # Header Navigation, Search & User Badges
│   │       ├── HeroBanner.jsx       # Top AI Briefing Featured Banner
│   │       ├── NewsCard.jsx         # AI News Cards with Sentiment Badges
│   │       ├── AudioPlayer.jsx      # Speech Synthesis Engine & Transcript Player
│   │       ├── AuthModal.jsx        # JWT Login, Sign-up & 1-Click Demo Fill
│   │       ├── AskAIModal.jsx       # Interactive AI News Assistant
│   │       └── PreferencesModal.jsx # Topic & Summary Depth Settings
│   └── vite.config.js
├── api/                      # Vercel Serverless Function Wrapper
│   └── index.js
└── vercel.json               # Monorepo Deployment Config
```

---

## ✨ Features Implemented

### 1. 🔐 Auth & 1-Click Demo Testing
- Secure JWT authentication (`POST /api/auth/login`, `POST /api/auth/register`).
- **1-Click Demo Auto-Fill**: Evaluators can click *"Click to Auto-Fill Demo Credentials"* (`demo@nuzio.ai`) in the login modal for instant testing.
- Preferences management for topic subscriptions, summary lengths, and playback speeds.

### 2. 📰 Personalized News Feed Deck
- **Hero Briefing Card**: Highlights the top trending AI story with immediate play trigger.
- **3-Column Grid**: Displays curated news stories with category tags, sentiment indicators, read times, and bullet-point executive summaries.
- **Category Filter & Live Search**: Instant filtering across Tech, Economy, Science, Mobility, and Climate.

### 3. 🔊 Real-Time Speech Synthesis & Audio Player
- **Web Speech API Engine**: Click *"Play AI Audio Briefing"* to hear real speech synthesis of news transcripts directly in your browser.
- **Waveform Equalizer**: Animated equalizer wave bars pulsing during audio playback.
- **Live Synchronized Transcript Drawer**: Displays the full text and highlights words as they are spoken.
- **Audio Controls**: Speed selector (`0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`), seek progress bar, and skip controls.

### 4. 🤖 Ask AI News Assistant
- Interactive slide-over modal available on every article card.
- Click preset questions (e.g., *"Why is this breakthrough significant?"*) or ask custom questions to get real-time AI contextual explanations.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide Icons, Web Speech API
- **Backend**: Node.js, Express, CORS, JSONWebToken
- **Deployment**: Vercel Serverless Ready (`vercel.json` included)

---

## 💻 Local Setup Instructions

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

Open [http://localhost:5173](http://localhost:5173) to run the application locally!

---

## 📡 Backend API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /` | `GET` | API Health & Routing Directory |
| `GET /api/health` | `GET` | Server status check |
| `POST /api/auth/login` | `POST` | User login (returns JWT token) |
| `POST /api/auth/register` | `POST` | User registration |
| `GET /api/user/profile` | `GET` | Get authenticated user preferences |
| `PUT /api/user/preferences` | `PUT` | Update news topics & voice settings |
| `GET /api/news/personalized` | `GET` | Fetch personalized news articles |
| `POST /api/news/article/:id/like` | `POST` | Toggle article like count |
| `POST /api/news/article/:id/bookmark` | `POST` | Toggle saved bookmarks |
| `POST /api/news/ask-ai` | `POST` | Query AI assistant for contextual insights |

---

## 🏆 Submitted for Olinp Full-Stack Assignment Evaluation

