const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = "nuzio_ai_super_secret_jwt_key_2026";

// In-memory database of users
const users = [
  {
    id: "user-1",
    email: "demo@nuzio.ai",
    name: "Alex Vance",
    password: "password123", // In production use bcrypt
    preferences: {
      topics: ["AI & Tech", "Global Economy", "Science"],
      summaryLength: "Medium",
      voiceStyle: "Neural Male - Tech Lead",
      playbackSpeed: 1.0,
      autoPlayNext: true
    },
    bookmarks: ["news-1", "news-3"],
    likes: ["news-1"]
  }
];

// Helper to find user by ID
const findUserById = (id) => users.find((u) => u.id === id);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token missing or invalid" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token is invalid or expired" });
    }
    req.user = user;
    next();
  });
};

// POST /api/auth/register
router.post("/register", (req, res) => {
  const { name, email, password, topics } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: "User with this email already exists" });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    preferences: {
      topics: topics || ["AI & Tech", "Global Economy"],
      summaryLength: "Medium",
      voiceStyle: "Neural Female - News Anchor",
      playbackSpeed: 1.0,
      autoPlayNext: true
    },
    bookmarks: [],
    likes: []
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, {
    expiresIn: "7d"
  });

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: "Registration successful",
    token,
    user: userWithoutPassword
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d"
  });

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: "Login successful",
    token,
    user: userWithoutPassword
  });
});

// GET /api/user/profile
router.get("/profile", authenticateToken, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// PUT /api/user/preferences
router.put("/preferences", authenticateToken, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { topics, summaryLength, voiceStyle, playbackSpeed, autoPlayNext } = req.body;
  
  if (topics) user.preferences.topics = topics;
  if (summaryLength) user.preferences.summaryLength = summaryLength;
  if (voiceStyle) user.preferences.voiceStyle = voiceStyle;
  if (playbackSpeed) user.preferences.playbackSpeed = playbackSpeed;
  if (typeof autoPlayNext === "boolean") user.preferences.autoPlayNext = autoPlayNext;

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: "Preferences updated successfully",
    user: userWithoutPassword
  });
});

module.exports = { router, authenticateToken, users };
