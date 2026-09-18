import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import NewsCard from './components/NewsCard';
import AudioPlayer from './components/AudioPlayer';
import AuthModal from './components/AuthModal';
import AskAIModal from './components/AskAIModal';
import PreferencesModal from './components/PreferencesModal';
import { Sparkles, Radio, Bookmark, Compass, RefreshCw, Layers } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nuzio_token') || '');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tabs & Filter State
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'bookmarks'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Audio Player State
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Modals State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [askAIArticle, setAskAIArticle] = useState(null);

  const categories = ['All', 'AI & Tech', 'Global Economy', 'Science', 'Mobility & Transport', 'Energy & Climate'];

  // Load User Profile if Token exists
  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    }
  }, [token]);

  // Load News Feed when Category or Search changes
  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, searchQuery]);

  const fetchUserProfile = async (authToken) => {
    try {
      const res = await fetch(`${API_BASE}/user/profile`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        // Token expired
        localStorage.removeItem('nuzio_token');
        setToken('');
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/news/personalized?`;
      if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}`;

      const res = await fetch(url);
      const data = await res.json();
      setArticles(data.articles || []);
      if (!currentArticle && data.articles && data.articles.length > 0) {
        setCurrentArticle(data.articles[0]);
      }
    } catch (err) {
      console.error('Failed to fetch news articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auth Handlers
  const handleLogin = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('nuzio_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const handleRegister = async ({ name, email, password, topics }) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, topics })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');

    localStorage.setItem('nuzio_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('nuzio_token');
    setToken('');
    setUser(null);
  };

  // User Preferences Save
  const handleSavePreferences = async (newPrefs) => {
    if (!token) return;
    const res = await fetch(`${API_BASE}/user/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newPrefs)
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  // Like & Bookmark Handlers
  const handleLike = async (articleId) => {
    if (!token) {
      setIsAuthOpen(true);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/news/article/${articleId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => {
          const likes = [...(prev?.likes || [])];
          if (data.isLiked) likes.push(articleId);
          else {
            const idx = likes.indexOf(articleId);
            if (idx > -1) likes.splice(idx, 1);
          }
          return { ...prev, likes };
        });

        // Update article likes count in state
        setArticles((prev) =>
          prev.map((a) => (a.id === articleId ? { ...a, likesCount: data.likesCount } : a))
        );
      }
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const handleBookmark = async (articleId) => {
    if (!token) {
      setIsAuthOpen(true);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/news/article/${articleId}/bookmark`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, bookmarks: data.userBookmarks }));
      }
    } catch (err) {
      console.error('Bookmark failed:', err);
    }
  };

  // Ask AI Handler
  const handleAskAI = async (question, articleId) => {
    const res = await fetch(`${API_BASE}/news/ask-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, articleId })
    });
    return await res.json();
  };

  // Play / Pause Audio Toggle
  const handlePlayToggle = (article, overrideState) => {
    if (currentArticle?.id === article.id) {
      setIsPlaying(overrideState !== undefined ? overrideState : !isPlaying);
    } else {
      setCurrentArticle(article);
      setIsPlaying(true);
    }
  };

  // Skip Prev / Next
  const handleNextArticle = () => {
    if (!currentArticle || articles.length === 0) return;
    const currentIndex = articles.findIndex((a) => a.id === currentArticle.id);
    const nextIndex = (currentIndex + 1) % articles.length;
    setCurrentArticle(articles[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevArticle = () => {
    if (!currentArticle || articles.length === 0) return;
    const currentIndex = articles.findIndex((a) => a.id === currentArticle.id);
    const prevIndex = (currentIndex - 1 + articles.length) % articles.length;
    setCurrentArticle(articles[prevIndex]);
    setIsPlaying(true);
  };

  // Filter Bookmarked Articles
  const displayedArticles = activeTab === 'bookmarks'
    ? articles.filter((a) => user?.bookmarks?.includes(a.id))
    : articles;

  const heroArticle = displayedArticles[0];
  const gridArticles = displayedArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] pb-28">
      
      {/* Navbar Header */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* Category Pills & Personalization Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`glass-pill px-4 py-2 text-xs font-semibold whitespace-nowrap ${
                  selectedCategory === cat ? 'active text-white' : 'text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Personalization: <strong className="text-indigo-300 font-semibold">{user ? user.preferences?.summaryLength || 'Medium' : 'Default'}</strong></span>
          </div>

        </div>

        {/* Tab Title header */}
        {activeTab === 'bookmarks' && (
          <div className="mb-6 p-4 rounded-2xl glass-panel bg-purple-950/20 border-purple-500/30 flex items-center gap-3">
            <Bookmark className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Your Saved AI News Library</h2>
              <p className="text-xs text-purple-300">Access your saved audio briefings for quick review anytime</p>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
            <p className="text-xs text-slate-400 font-medium">Generating your personalized AI news stream...</p>
          </div>
        ) : displayedArticles.length === 0 ? (
          <div className="text-center py-20 glass-panel p-8">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">No news articles found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {activeTab === 'bookmarks'
                ? 'You have not saved any news articles yet. Click the bookmark icon on any card to save it here.'
                : 'Try clearing your search query or selecting a different news topic.'}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Hero Article */}
            {heroArticle && activeTab === 'feed' && (
              <HeroBanner
                article={heroArticle}
                currentPlayingId={currentArticle?.id}
                isPlaying={isPlaying}
                onPlayToggle={handlePlayToggle}
                onLike={handleLike}
                onBookmark={handleBookmark}
                isLiked={user?.likes?.includes(heroArticle.id)}
                isBookmarked={user?.bookmarks?.includes(heroArticle.id)}
              />
            )}

            {/* News Grid Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>{activeTab === 'bookmarks' ? 'Saved Stories' : 'Latest AI Briefings'}</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                Showing {displayedArticles.length} curated stories
              </span>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'feed' ? gridArticles : displayedArticles).map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  currentPlayingId={currentArticle?.id}
                  isPlaying={isPlaying}
                  onPlayToggle={handlePlayToggle}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  isLiked={user?.likes?.includes(article.id)}
                  isBookmarked={user?.bookmarks?.includes(article.id)}
                  onAskAI={(art) => setAskAIArticle(art)}
                />
              ))}
            </div>
          </>
        )}

      </main>

      {/* Persistent Audio Player Drawer */}
      {currentArticle && (
        <AudioPlayer
          article={currentArticle}
          isPlaying={isPlaying}
          onPlayToggle={handlePlayToggle}
          onNext={handleNextArticle}
          onPrev={handlePrevArticle}
          onAskAI={(art) => setAskAIArticle(art)}
          playbackSpeed={playbackSpeed}
          onSpeedChange={setPlaybackSpeed}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Ask AI Modal */}
      <AskAIModal
        isOpen={!!askAIArticle}
        onClose={() => setAskAIArticle(null)}
        article={askAIArticle}
        onAsk={handleAskAI}
      />

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={user?.preferences}
        onSave={handleSavePreferences}
      />

    </div>
  );
}
