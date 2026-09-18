import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, HelpCircle } from 'lucide-react';

export default function AskAIModal({ isOpen, onClose, article, onAsk }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your Nuzio AI Assistant for "${article?.title || 'this news article'}". Ask me anything about context, industry impact, or key background details!`
    }
  ]);

  if (!isOpen || !article) return null;

  const presetQuestions = [
    'Why is this breakthrough significant?',
    'What are the primary financial impacts?',
    'Explain the underlying technology simply.'
  ];

  const handleSend = async (qText) => {
    const query = qText || question;
    if (!query.trim()) return;

    // Add user message
    const updatedHistory = [...chatHistory, { sender: 'user', text: query }];
    setChatHistory(updatedHistory);
    if (!qText) setQuestion('');
    setLoading(true);

    try {
      const res = await onAsk(query, article.id);
      setChatHistory([
        ...updatedHistory,
        { sender: 'ai', text: res.answer || 'Thank you for your question. Nuzio AI is processing further details.' }
      ]);
    } catch (err) {
      setChatHistory([
        ...updatedHistory,
        { sender: 'ai', text: 'I apologize, but I encountered an error fetching AI insights. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-lg h-[80vh] flex flex-col relative border-white/20 bg-[#0e1424]/95 shadow-2xl p-0 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white font-['Space_Grotesk']">Ask Nuzio AI Assistant</h3>
              <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{article.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Pills */}
        <div className="p-3 border-b border-white/5 bg-black/20 flex gap-2 overflow-x-auto no-scrollbar">
          {presetQuestions.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq)}
              className="px-3 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 whitespace-nowrap shrink-0 transition-all flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3 text-indigo-400" />
              <span>{pq}</span>
            </button>
          ))}
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-md'
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-indigo-300 animate-pulse">
                Nuzio AI is analyzing full article transcript...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-white/10 bg-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about this news story..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="glow-btn p-2.5 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
