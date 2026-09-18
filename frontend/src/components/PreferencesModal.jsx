import React, { useState } from 'react';
import { X, Sliders, Check, Volume2, FastForward, ListFilter, Save } from 'lucide-react';

export default function PreferencesModal({ isOpen, onClose, preferences, onSave }) {
  const [topics, setTopics] = useState(preferences?.topics || ['AI & Tech', 'Global Economy']);
  const [summaryLength, setSummaryLength] = useState(preferences?.summaryLength || 'Medium');
  const [voiceStyle, setVoiceStyle] = useState(preferences?.voiceStyle || 'Neural Female - News Anchor');
  const [playbackSpeed, setPlaybackSpeed] = useState(preferences?.playbackSpeed || 1.0);
  const [autoPlayNext, setAutoPlayNext] = useState(preferences?.autoPlayNext ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const topicsList = ['AI & Tech', 'Global Economy', 'Science', 'Mobility & Transport', 'Energy & Climate', 'Crypto'];
  const summaryOptions = ['Short & Punchy (1 min)', 'Medium Balanced (3 min)', 'Deep-Dive Detailed (5 min)'];
  const voiceOptions = [
    'Neural Female - News Anchor',
    'Neural Male - Tech Lead',
    'Executive Daily Briefing'
  ];

  const toggleTopic = (t) => {
    if (topics.includes(t)) {
      setTopics(topics.filter((item) => item !== t));
    } else {
      setTopics([...topics, t]);
    }
  };

  const handleSave = async () => {
    await onSave({
      topics,
      summaryLength,
      voiceStyle,
      playbackSpeed,
      autoPlayNext
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-md p-6 relative border-white/15 bg-[#0e1424]/95 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Sliders className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-white">AI Personalization Settings</h2>
            <p className="text-xs text-slate-400">Customize your personalized news feed & audio synthesis</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-semibold animate-pulse">
            Preferences Saved Successfully!
          </div>
        )}

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          
          {/* Preferred Topics */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <ListFilter className="w-4 h-4 text-indigo-400" />
              <span>Preferred News Topics</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {topicsList.map((t) => {
                const active = topics.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTopic(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-md'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>{t}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Voice Model */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span>AI Voice Synthesis Tone</span>
            </label>
            <div className="space-y-2">
              {voiceOptions.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVoiceStyle(v)}
                  className={`w-full p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    voiceStyle === v
                      ? 'bg-purple-600/20 text-purple-200 border-purple-500/50'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span>{v}</span>
                  {voiceStyle === v && <Check className="w-4 h-4 text-purple-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Depth */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">AI Summary Detail Level</label>
            <select
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
              className="w-full p-2.5 bg-[#121826] border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {summaryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Auto Play Next */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p className="text-xs font-bold text-slate-200">Auto-Play Next Briefing</p>
              <p className="text-[11px] text-slate-400">Continuous playback for uninterrupted news listening</p>
            </div>
            <input
              type="checkbox"
              checked={autoPlayNext}
              onChange={(e) => setAutoPlayNext(e.target.checked)}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>

        </div>

        {/* Save Action */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={handleSave}
            className="w-full glow-btn py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Apply Personalization Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}
