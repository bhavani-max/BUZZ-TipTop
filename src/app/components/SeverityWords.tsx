import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Hash } from "lucide-react";

interface SeverityWord {
  id: string;
  word: string;
  severity: "low" | "medium" | "high";
  description: string;
  size: number;
}

export function SeverityWords() {
  const [hoveredWord, setHoveredWord] = useState<SeverityWord | null>(null);

  // Mock data representing backend feed
  const [words] = useState<SeverityWord[]>([
    { id: "1", word: "Earthquake", severity: "high", description: "Magnitude 6.5 earthquake reported off the coast.", size: 2.5 },
    { id: "2", word: "Election", severity: "medium", description: "Upcoming local elections seeing record turnout.", size: 2.0 },
    { id: "3", word: "Festival", severity: "low", description: "Annual city festival begins this weekend.", size: 1.5 },
    { id: "4", word: "Market Crash", severity: "high", description: "Tech stocks plunge amid regulatory fears.", size: 2.2 },
    { id: "5", word: "Tech Expo", severity: "low", description: "New gadgets unveiled at the global tech expo.", size: 1.8 },
    { id: "6", word: "Protests", severity: "medium", description: "Thousands gather to protest new environmental policy.", size: 1.9 },
    { id: "7", word: "Breakthrough", severity: "low", description: "Scientists discover new method for recycling plastic.", size: 1.7 },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600";
      case "medium": return "text-orange-500";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-50 border-red-200";
      case "medium": return "bg-orange-50 border-orange-200";
      case "low": return "bg-green-50 border-green-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[500px] flex flex-col relative">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 z-10 relative">
        <div className="flex items-center gap-2 mb-1">
          <Hash className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Live Headline Intelligence</h3>
        </div>
        <p className="text-sm text-gray-500">Real-time keyword severity tracking</p>
      </div>
      
      <div className="flex-1 relative overflow-y-auto bg-white p-6">
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-center justify-center content-center min-h-full">
          {words.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer transition-transform hover:scale-105 duration-200"
              onMouseEnter={() => setHoveredWord(item)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <div 
                className={`font-bold transition-colors duration-300 ${getSeverityColor(item.severity)}`}
                style={{ fontSize: `${item.size}rem`, lineHeight: 1 }}
              >
                {item.word}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {hoveredWord && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-6 left-6 right-6 z-50 pointer-events-none"
            >
              <div className={`p-4 rounded-xl shadow-lg border flex items-start gap-4 ${getSeverityBgColor(hoveredWord.severity)} bg-white/95 backdrop-blur-sm`}>
                <div className={`p-2 rounded-full bg-white shadow-sm ${getSeverityColor(hoveredWord.severity)}`}>
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-1 ${getSeverityColor(hoveredWord.severity)}`}>
                    {hoveredWord.word}
                    <span className="ml-2 text-xs font-medium px-2 py-1 bg-white rounded-full uppercase tracking-wider border border-gray-100 shadow-sm">
                      {hoveredWord.severity} Severity
                    </span>
                  </h4>
                  <p className="text-gray-700 font-medium text-sm">
                    {hoveredWord.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
