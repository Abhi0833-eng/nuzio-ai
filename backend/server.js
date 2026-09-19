const express = require("express");
const cors = require("cors");
const { router: authRouter } = require("./routes/auth");
const newsRouter = require("./routes/news");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Root API Welcome Info
const apiInfoHandler = (req, res) => {
  res.json({
    status: "active",
    name: "Nuzio AI - Full-Stack Personalized Audio News API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: {
        login: "POST /api/auth/login",
        register: "POST /api/auth/register",
        profile: "GET /api/user/profile",
        preferences: "PUT /api/user/preferences"
      },
      news: {
        personalized: "GET /api/news/personalized",
        article: "GET /api/news/article/:id",
        like: "POST /api/news/article/:id/like",
        bookmark: "POST /api/news/article/:id/bookmark",
        askAI: "POST /api/news/ask-ai"
      }
    }
  });
};

app.get("/", apiInfoHandler);
app.get("/api", apiInfoHandler);
app.get("/api/", apiInfoHandler);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", authRouter);
app.use("/api/news", newsRouter);

// Base Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Nuzio AI Backend",
    timestamp: new Date().toISOString()
  });
});

// Start Server conditionally (for local node execution vs Vercel Serverless)
if (require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Nuzio AI Backend Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
