import React from 'react';
import { Play, Pause, Volume2, Sparkles, Clock, ThumbsUp, Bookmark } from 'lucide-react';

export default function HeroBanner({ article, currentPlayingId, isPlaying, onPlayToggle, onLike, onBookmark, isLiked, isBookmarked }) {
  if (!article) return null;

  const isCurrentPlaying = currentPlayingId === article.id;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border-white/15 mb-8 p-6 lg:p-8 group shadow-2xl">
      
      {/* Background Glow & Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-700"
        style={{ backgroundImage: `url(${article.coverImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Top AI Briefing
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Article Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight mb-3">
          {article.title}
        </h1>

        <p className="text-sm text-slate-300 mb-5 line-clamp-2">
          {article.subtitle}
        </p>

        {/* AI Key Takeaways Bullets */}
        <div className="mb-6 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Executive Summary
          </p>
          {article.summary.map((point, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* Play Action Bar */}
        <div className="flex flex-wrap items-center gap-4">
          
          <button
            onClick={() => onPlayToggle(article)}
            className="glow-btn px-6 py-3 rounded-full flex items-center gap-3 text-sm font-bold shadow-xl"
          >
            {isCurrentPlaying && isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-white" />
                <span>Pause Briefing</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>{isCurrentPlaying ? 'Resume Briefing' : 'Play AI Audio Briefing'}</span>
              </>
            )}
          </button>

          {/* Waveform preview when playing */}
          {isCurrentPlaying && isPlaying && (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-500/40">
              <Volume2 className="w-4 h-4 text-indigo-400 animate-pulse" />
              <div className="flex items-end gap-1 h-5">
                <div className="waveform-bar" />
                <div className="waveform-bar" />
                <div className="waveform-bar" />
                <div className="waveform-bar" />
              </div>
              <span className="text-xs text-indigo-300 font-mono ml-2">Playing...</span>
            </div>
          )}

          {/* Social Interactions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => onLike(article.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isLiked
                  ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>

            <button
              onClick={() => onBookmark(article.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isBookmarked
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
