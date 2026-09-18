import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronUp,
  ChevronDown,
  X,
  Maximize2
} from 'lucide-react';

export default function AudioPlayer({
  article,
  isPlaying,
  onPlayToggle,
  onNext,
  onPrev,
  onAskAI,
  playbackSpeed,
  onSpeedChange
}) {
  const [synth, setSynth] = useState(null);
  const [speechUtterance, setSpeechUtterance] = useState(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const utteranceRef = useRef(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Handle Article Change & Speech Synthesis Setup
  useEffect(() => {
    if (!synth || !article) return;

    // Cancel existing speech
    synth.cancel();

    const textToSpeak = article.audioTranscript || article.fullText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCharIndex(event.charIndex);
        const percent = (event.charIndex / textToSpeak.length) * 100;
        setProgress(percent);
      }
    };

    utterance.onend = () => {
      setProgress(100);
      onPlayToggle(article, false);
      if (onNext) onNext();
    };

    utteranceRef.current = utterance;
    setSpeechUtterance(utterance);

    if (isPlaying) {
      synth.speak(utterance);
    }

    return () => {
      synth.cancel();
    };
  }, [article?.id]);

  // Handle Play/Pause changes
  useEffect(() => {
    if (!synth || !utteranceRef.current) return;

    if (isPlaying) {
      if (synth.paused) {
        synth.resume();
      } else if (!synth.speaking) {
        synth.speak(utteranceRef.current);
      }
    } else {
      if (synth.speaking) {
        synth.pause();
      }
    }
  }, [isPlaying]);

  // Handle Speed change
  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle Volume change
  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!article) return null;

  const fullText = article.audioTranscript || article.fullText;
  const spokenTextPart = fullText.slice(0, charIndex);
  const remainingTextPart = fullText.slice(charIndex);

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-0 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        
        {/* Transcript Drawer Overlay */}
        {showTranscript && (
          <div className="glass-panel border-b-0 rounded-b-none p-5 mb-0 bg-[#0e1424]/95 border-white/20 shadow-2xl animate-fadeIn max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Real-Time AI Audio Transcript
                </span>
              </div>
              <button
                onClick={() => setShowTranscript(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm leading-relaxed font-sans">
              <span className="text-indigo-300 font-semibold bg-indigo-500/20 rounded px-1">
                {spokenTextPart}
              </span>
              <span className="text-slate-400">{remainingTextPart}</span>
            </p>
          </div>
        )}

        {/* Main Audio Player Bar */}
        <div className="glass-panel p-4 bg-[#0a0e1a]/95 border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Article Info & Cover */}
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div className="overflow-hidden">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {article.category}
              </span>
              <h4 className="text-xs font-bold text-white truncate font-['Space_Grotesk'] mt-1">
                {article.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">{article.author}</p>
            </div>
          </div>

          {/* Center: Playback Controls & Progress */}
          <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
            
            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Previous Article"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => onPlayToggle(article)}
                className="w-10 h-10 rounded-full glow-btn flex items-center justify-center shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={onNext}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Next Article"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar & Waveform */}
            <div className="w-full flex items-center gap-2">
              <div className="flex items-end gap-0.5 h-4 shrink-0">
                <div className={`waveform-bar ${!isPlaying ? 'paused' : ''}`} />
                <div className={`waveform-bar ${!isPlaying ? 'paused' : ''}`} />
                <div className={`waveform-bar ${!isPlaying ? 'paused' : ''}`} />
                <div className={`waveform-bar ${!isPlaying ? 'paused' : ''}`} />
              </div>

              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                {Math.round(progress)}%
              </span>
            </div>

          </div>

          {/* Right: Actions, Speed, Transcript & Ask AI */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
            
            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1">
              {speedOptions.map((spd) => (
                <button
                  key={spd}
                  onClick={() => onSpeedChange(spd)}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all ${
                    playbackSpeed === spd
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Transcript Toggle */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`p-2 rounded-full border text-xs font-semibold flex items-center gap-1 transition-all ${
                showTranscript
                  ? 'bg-indigo-500/30 text-indigo-300 border-indigo-500/50'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
              title="Toggle Live Transcript"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Ask AI Trigger */}
            <button
              onClick={() => onAskAI(article)}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
