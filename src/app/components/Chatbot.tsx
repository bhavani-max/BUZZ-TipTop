import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const SYSTEM_PROMPT = `You are Buzz, an intelligent AI news assistant embedded in the Buzz News Analytics Dashboard — a platform that monitors headlines across publishers like NYT, Reuters, BBC, Guardian, CNN, AP, Financial Times, and Washington Post.

Your expertise:
- Analyzing news trends, categories (Politics, Technology, Sports, Health, Business, Environment, Education, World News)
- Summarizing breaking news and explaining why stories matter
- Comparing publisher sentiment and editorial angles
- Explaining popularity scores and what drives them
- Helping users filter, search, and navigate the dashboard

Be concise, insightful, and conversational. Use bullet points for lists. Keep responses under 200 words unless asked to elaborate. Never fabricate specific article URLs or quotes. When you don't know something specific, say so and suggest what the user can do on the dashboard.`;

const SUGGESTED_PROMPTS = [
  "What's trending in Politics today?",
  "Explain the popularity score system",
  "How do I filter by publisher?",
  "Summarize today's top tech news",
];

// ---------------------------------------------------------------------------
// Helper: call Gemini API
// ---------------------------------------------------------------------------
async function callGemini(
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  userMessage: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("NO_API_KEY");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      ...history,
      { role: "user", parts: [{ text: userMessage }] },
    ],
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "I couldn't generate a response. Please try again.";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm **Buzz**, your AI news assistant 👋\n\nAsk me anything about today's headlines, trends, or how to use the dashboard.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep conversation history for Gemini (excluding the initial greeting)
  const geminiHistory = useRef<{ role: "user" | "model"; parts: { text: string }[] }[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const reply = await callGemini(geminiHistory.current, text.trim());

      // Update Gemini history
      geminiHistory.current = [
        ...geminiHistory.current,
        { role: "user", parts: [{ text: text.trim() }] },
        { role: "model", parts: [{ text: reply }] },
      ];

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply },
      ]);
    } catch (err: unknown) {
      const isNoKey = err instanceof Error && err.message === "NO_API_KEY";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: isNoKey
            ? "⚙️ **Setup needed:** Add your Gemini API key as `VITE_GEMINI_API_KEY` in a `.env` file at the project root to enable AI responses.\n\nGet a free key at [aistudio.google.com](https://aistudio.google.com)."
            : `❌ Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleReset = () => {
    geminiHistory.current = [];
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Hi! I'm **Buzz**, your AI news assistant 👋\n\nAsk me anything about today's headlines, trends, or how to use the dashboard.",
      },
    ]);
    setShowSuggestions(true);
  };

  // Simple markdown-like renderer (bold, line breaks)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          id="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#c58ae6] to-[#9f5bd1] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50"
          aria-label="Open Buzz AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-6 right-6 w-80 sm:w-96 h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200"
          style={{ animation: "slideUpFade 0.25s ease-out" }}
        >
          <style>{`
            @keyframes slideUpFade {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0)   scale(1); }
            }
            @keyframes dotBounce {
              0%, 80%, 100% { transform: translateY(0); }
              40%            { transform: translateY(-6px); }
            }
          `}</style>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#c58ae6] to-[#9f5bd1] p-4 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1">
                  Buzz Assistant
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                  Powered by Gemini AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
                title="New conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-600"
                        : msg.isError
                        ? "bg-red-100 text-red-500"
                        : "bg-[#c58ae6]/20 text-[#9f5bd1]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3 h-3" />
                    ) : msg.isError ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#9f5bd1] text-white rounded-tr-sm"
                        : msg.isError
                        ? "bg-red-50 text-red-700 border border-red-100 rounded-tl-sm"
                        : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#c58ae6]/20 text-[#9f5bd1]">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-sm bg-white border border-gray-100 shadow-sm flex gap-1.5 items-center">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-2 h-2 bg-[#c58ae6] rounded-full"
                        style={{ animation: `dotBounce 1.2s ${delay}ms infinite` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggested prompts */}
            {showSuggestions && messages.length === 1 && !isTyping && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-gray-400 text-center">Try asking:</p>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="w-full text-left text-xs text-gray-600 bg-white hover:bg-[#c58ae6]/10 hover:text-[#9f5bd1] border border-gray-200 hover:border-[#c58ae6]/40 rounded-xl px-3 py-2 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2 relative">
              <input
                id="chatbot-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about news, trends..."
                disabled={isTyping}
                className="flex-1 border border-gray-200 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#c58ae6]/50 focus:border-[#c58ae6] transition-all bg-gray-50 disabled:opacity-60"
              />
              <button
                id="chatbot-send"
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-1 top-1 w-8 h-8 bg-gradient-to-br from-[#c58ae6] to-[#9f5bd1] hover:opacity-90 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </form>
            <p className="text-center text-[10px] text-gray-400 mt-1.5">Buzz AI · Gemini powered</p>
          </div>
        </div>
      )}
    </>
  );
}
