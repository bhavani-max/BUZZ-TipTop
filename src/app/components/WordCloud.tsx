import { TrendingUp, Hash } from "lucide-react";

export function WordCloud() {
  const words = [
    { text: "Climate Change", size: "text-3xl", color: "#22c55e", trend: "+15%" },
    { text: "AI Revolution", size: "text-2xl", color: "#c58ae6", trend: "+28%" },
    { text: "Electric Vehicles", size: "text-xl", color: "#3b82f6", trend: "+12%" },
    { text: "Space Exploration", size: "text-lg", color: "#f59e0b", trend: "+8%" },
    { text: "Renewable Energy", size: "text-xl", color: "#10b981", trend: "+18%" },
    { text: "Cryptocurrency", size: "text-sm", color: "#8b5cf6", trend: "+5%" },
    { text: "Healthcare Innovation", size: "text-2xl", color: "#ef4444", trend: "+22%" },
    { text: "Remote Work", size: "text-lg", color: "#06b6d4", trend: "+7%" },
    { text: "Sustainability", size: "text-xl", color: "#84cc16", trend: "+14%" },
    { text: "Digital Transformation", size: "text-sm", color: "#f97316", trend: "+9%" },
    { text: "Mental Health", size: "text-2xl", color: "#ec4899", trend: "+25%" },
    { text: "Food Security", size: "text-lg", color: "#eab308", trend: "+11%" },
    { text: "Quantum Computing", size: "text-sm", color: "#6366f1", trend: "+6%" },
    { text: "Social Media", size: "text-xl", color: "#14b8a6", trend: "+13%" },
    { text: "Global Economy", size: "text-2xl", color: "#374151", trend: "+19%" },
    { text: "Education Reform", size: "text-lg", color: "#d946ef", trend: "+10%" }
  ];

  const getTrendColor = (trend: string) => {
    const value = parseInt(trend.replace('%', '').replace('+', ''));
    if (value >= 20) return "text-green-600";
    if (value >= 10) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <Hash className="w-4 h-4 text-[#c58ae6]" />
          <h3 className="font-medium text-gray-900">Trending Topics</h3>
        </div>
        <p className="text-sm text-gray-600">Most discussed keywords in the last 24 hours</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6" style={{ minHeight: '200px' }}>
          {words.map((word, index) => (
            <div
              key={index}
              className="group cursor-pointer hover:scale-105 transition-transform duration-200 text-center"
            >
              <span
                className={`${word.size} font-normal leading-tight block group-hover:opacity-75 transition-opacity`}
                style={{ color: word.color }}
              >
                {word.text}
              </span>
              <div className={`text-xs mt-1 ${getTrendColor(word.trend)} opacity-0 group-hover:opacity-100 transition-opacity`}>
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {word.trend}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span>Trend Analysis</span>
            <span className="text-[#c58ae6]">Last updated: 2 min ago</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-700">↗ 67%</div>
              <div className="text-green-600">Rising Topics</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-700">🔥 24</div>
              <div className="text-blue-600">Hot Keywords</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}