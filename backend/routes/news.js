const express = require("express");
const router = express.Router();
const { mockNewsArticles } = require("../data/mockNews");
const { authenticateToken, users } = require("./auth");

// GET /api/news/personalized
router.get("/personalized", (req, res) => {
  const { category, search } = req.query;

  let results = [...mockNewsArticles];

  if (category && category !== "All") {
    results = results.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term) ||
        item.fullText.toLowerCase().includes(term)
    );
  }

  res.json({
    count: results.length,
    articles: results
  });
});

// GET /api/news/:id
router.get("/article/:id", (req, res) => {
  const article = mockNewsArticles.find((a) => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ error: "News article not found" });
  }
  res.json(article);
});

// POST /api/news/:id/like
router.post("/article/:id/like", authenticateToken, (req, res) => {
  const article = mockNewsArticles.find((a) => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ error: "News article not found" });
  }

  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const index = user.likes.indexOf(article.id);
  let isLiked = false;

  if (index > -1) {
    user.likes.splice(index, 1);
    article.likesCount = Math.max(0, article.likesCount - 1);
  } else {
    user.likes.push(article.id);
    article.likesCount += 1;
    isLiked = true;
  }

  res.json({
    message: isLiked ? "Article liked" : "Article unliked",
    isLiked,
    likesCount: article.likesCount
  });
});

// POST /api/news/:id/bookmark
router.post("/article/:id/bookmark", authenticateToken, (req, res) => {
  const article = mockNewsArticles.find((a) => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ error: "News article not found" });
  }

  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const index = user.bookmarks.indexOf(article.id);
  let isBookmarked = false;

  if (index > -1) {
    user.bookmarks.splice(index, 1);
    article.bookmarksCount = Math.max(0, article.bookmarksCount - 1);
  } else {
    user.bookmarks.push(article.id);
    article.bookmarksCount += 1;
    isBookmarked = true;
  }

  res.json({
    message: isBookmarked ? "Article bookmarked" : "Bookmark removed",
    isBookmarked,
    userBookmarks: user.bookmarks
  });
});

// POST /api/news/ask-ai
router.post("/ask-ai", (req, res) => {
  const { question, articleId } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  const article = mockNewsArticles.find((a) => a.id === articleId);
  const contextTitle = article ? article.title : "Personalized News Feed";

  // Synthesize intelligent AI contextual answer
  let aiAnswer = `Based on the latest reports regarding "${contextTitle}": ${question} points to key developments. In short, the underlying neural infrastructure and regulatory frameworks are accelerating adoption while maintaining safety boundaries.`;

  if (question.toLowerCase().includes("why") || question.toLowerCase().includes("how")) {
    aiAnswer = `Analyzing context from "${contextTitle}": The key mechanism is direct neural waveform processing combined with real-time feedback loops. This reduces latency while maintaining high precision.`;
  } else if (question.toLowerCase().includes("future") || question.toLowerCase().includes("impact")) {
    aiAnswer = `The long-term impact for "${contextTitle}" includes up to 10x faster efficiency, widespread mobile adoption, and massive cost reductions across global sectors.`;
  }

  res.json({
    question,
    articleTitle: contextTitle,
    answer: aiAnswer,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
