import React from 'react';
import { Radio, Search, Sliders, Bookmark, User, LogOut, Sparkles, Volume2 } from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onOpenPreferences,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-4 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('feed')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Radio className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-white font-['Space_Grotesk']">
                NUZIO<span className="gradient-text">.AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Personalized AI Audio News</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search news, topics, AI breakthroughs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Actions & User State */}
        <div className="flex items-center gap-3">
          
          {/* Feed vs Bookmarks Tab */}
          <button
            onClick={() => setActiveTab(activeTab === 'bookmarks' ? 'feed' : 'bookmarks')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-500/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Saved</span>
          </button>

          {/* Preferences Button */}
          {user && (
            <button
              onClick={onOpenPreferences}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Personalization Preferences"
            >
              <Sliders className="w-4 h-4" />
            </button>
          )}

          {/* User Auth Info / Button */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-200 leading-tight">{user.name}</p>
                <p className="text-[10px] text-indigo-400">Pro AI Subscriber</p>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-1"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="glow-btn px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
