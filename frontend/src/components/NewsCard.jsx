import React, { useState } from 'react';
import { Play, Pause, Sparkles, Clock, ThumbsUp, Bookmark } from 'lucide-react';

export default function NewsCard({
  article,
  currentPlayingId,
  isPlaying,
  onPlayToggle,
  onLike,
  onBookmark,
  isLiked,
  isBookmarked,
  onAskAI
}) {
  const [imgError, setImgError] = useState(false);
  const isCurrentPlaying = currentPlayingId === article.id;

  return (
    <div className="glass-panel flex flex-col justify-between overflow-hidden group hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
      
      {/* Cover Image & Category Pill */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950">
        {!imgError ? (
          <img
            src={article.coverImage}
            alt=""
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-indigo-900 to-purple-900 p-4">
            <Sparkles className="w-12 h-12 text-indigo-400/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-transparent opacity-90" />
        
        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#07090e]/85 backdrop-blur-md text-indigo-300 border border-white/10 shadow-md">
            {article.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            {article.sentiment}
          </span>
        </div>

        {/* Play Floating Button Overlay */}
        <button
          onClick={() => onPlayToggle(article)}
          className={`absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 shadow-xl z-10 ${
            isCurrentPlaying && isPlaying
              ? 'bg-purple-600 text-white scale-105 shadow-purple-500/40'
              : 'bg-indigo-600/90 text-white hover:scale-110 hover:bg-indigo-500 shadow-indigo-500/30'
          }`}
        >
          {isCurrentPlaying && isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] leading-snug mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mb-4">
            {article.subtitle}
          </p>

          {/* Key Bullet points preview */}
          <div className="space-y-1.5 mb-4 bg-white/5 p-3 rounded-xl border border-white/5">
            {article.summary.slice(0, 2).map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 leading-tight">
                <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span className="line-clamp-1">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button
            onClick={() => onAskAI(article)}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ask AI</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike(article.id)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all ${
                isLiked
                  ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{article.likesCount}</span>
            </button>

            <button
              onClick={() => onBookmark(article.id)}
              className={`p-1.5 rounded-full border transition-all ${
                isBookmarked
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
