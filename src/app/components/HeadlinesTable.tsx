import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, TrendingUp, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

interface Headline {
  id: string;
  image: string;
  publisher: string;
  category: string;
  headline: string;
  timestamp: string;
  popularity: number;
  isBreaking?: boolean;
}

const INITIAL_HEADLINES: Headline[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1611695434369-a8f5d76ceb7b?w=120&h=90&fit=crop",
    publisher: "The New York Times",
    category: "Politics",
    headline: "Senate Passes Landmark Climate Bill After Months of Negotiations",
    timestamp: "2 hours ago",
    popularity: 8.7,
    isBreaking: true
  },
  {
    id: "2", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=90&fit=crop",
    publisher: "Reuters",
    category: "Technology",
    headline: "AI Revolution Continues as Tech Giants Announce New Partnerships",
    timestamp: "4 hours ago",
    popularity: 7.2
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=120&h=90&fit=crop",
    publisher: "BBC News",
    category: "Sports", 
    headline: "World Cup Preparations Intensify as Teams Finalize Rosters",
    timestamp: "6 hours ago",
    popularity: 6.8
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=120&h=90&fit=crop",
    publisher: "The Guardian",
    category: "Health",
    headline: "New Medical Breakthrough Offers Hope for Cancer Treatment",
    timestamp: "8 hours ago", 
    popularity: 9.1
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=120&h=90&fit=crop",
    publisher: "Financial Times",
    category: "Business",
    headline: "Global Markets React to Federal Reserve's Latest Interest Rate Decision",
    timestamp: "10 hours ago", 
    popularity: 5.9
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&h=90&fit=crop", 
    publisher: "CNN",
    category: "World News",
    headline: "International Summit Addresses Global Food Security Crisis",
    timestamp: "12 hours ago",
    popularity: 7.5
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=120&h=90&fit=crop",
    publisher: "Associated Press",
    category: "Environment",
    headline: "Renewable Energy Adoption Reaches Record High in 2024",
    timestamp: "14 hours ago",
    popularity: 6.3
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=120&h=90&fit=crop",
    publisher: "The Washington Post",
    category: "Education",
    headline: "Universities Embrace Hybrid Learning Models for Fall Semester",
    timestamp: "16 hours ago",
    popularity: 4.7
  }
];

const MORE_HEADLINES: Headline[] = [
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=90&fit=crop",
    publisher: "Reuters",
    category: "Technology",
    headline: "Quantum Computing Startup Reaches Major Milestone",
    timestamp: "18 hours ago",
    popularity: 8.2
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=120&h=90&fit=crop",
    publisher: "CNN",
    category: "Politics",
    headline: "Local Elections Show Surprising Shift in Voter Demographics",
    timestamp: "20 hours ago",
    popularity: 6.5
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1508344928928-7137b29de216?w=120&h=90&fit=crop",
    publisher: "BBC News",
    category: "Environment",
    headline: "New Conservation Efforts Implemented in Rainforest Regions",
    timestamp: "22 hours ago",
    popularity: 7.9
  }
];

interface HeadlinesTableProps {
  searchQuery: string;
  categoryFilter: string;
  publisherFilter: string;
}

export function HeadlinesTable({ searchQuery, categoryFilter, publisherFilter }: HeadlinesTableProps) {
  const [headlines, setHeadlines] = useState<Headline[]>(INITIAL_HEADLINES);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHeadline, setSelectedHeadline] = useState<Headline | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      Politics: "bg-red-100 text-red-800",
      Technology: "bg-blue-100 text-blue-800",
      Sports: "bg-green-100 text-green-800",
      Health: "bg-purple-100 text-purple-800",
      Business: "bg-orange-100 text-orange-800",
      "World News": "bg-indigo-100 text-indigo-800",
      Environment: "bg-emerald-100 text-emerald-800",
      Education: "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setHeadlines(prev => [...prev, ...MORE_HEADLINES]);
      setIsLoading(false);
      toast.success("Successfully loaded more articles.");
    }, 1000);
  };

  const filteredHeadlines = headlines.filter(headline => {
    const matchesSearch = 
      headline.headline.toLowerCase().includes(searchQuery.toLowerCase()) || 
      headline.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || headline.category === categoryFilter;
    const matchesPublisher = publisherFilter === "all" || headline.publisher === publisherFilter;

    return matchesSearch && matchesCategory && matchesPublisher;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-1">Top Headlines</h2>
            <p className="text-sm text-gray-600">Showing {filteredHeadlines.length} articles</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Popularity Score</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100 min-h-[400px]">
        {filteredHeadlines.length > 0 ? (
          filteredHeadlines.map((headline) => (
            <article 
              key={headline.id} 
              className="px-6 py-5 hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
              onClick={() => setSelectedHeadline(headline)}
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <ImageWithFallback
                    src={headline.image}
                    alt={headline.headline}
                    className="w-24 h-18 rounded-md object-cover border border-gray-200"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-900">{headline.publisher}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(headline.category)}`}>
                      {headline.category}
                    </span>
                    {headline.isBreaking && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white animate-pulse">
                        BREAKING
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 leading-tight mb-3 group-hover:text-[#c58ae6] transition-colors">
                    {headline.headline}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{headline.timestamp}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toast(`Opening article: "${headline.headline}"`);
                        }}
                        className="flex items-center gap-1 hover:text-[#c58ae6] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Read more</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{headline.popularity}</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                      <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                        <div 
                          className="w-8 h-1 bg-[#c58ae6] rounded-full"
                          style={{ width: `${(headline.popularity / 10) * 32}px` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
            <p className="text-lg font-medium text-gray-700">No articles found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      
      {headlines.length === INITIAL_HEADLINES.length && filteredHeadlines.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-sm text-[#c58ae6] hover:text-[#b179e0] font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading Articles...
              </>
            ) : (
              "Load More Articles"
            )}
          </button>
        </div>
      )}

      <Dialog open={!!selectedHeadline} onOpenChange={(open) => !open && setSelectedHeadline(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-900">{selectedHeadline?.publisher}</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selectedHeadline ? getCategoryColor(selectedHeadline.category) : ''}`}>
                {selectedHeadline?.category}
              </span>
              {selectedHeadline?.isBreaking && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white animate-pulse">
                  BREAKING
                </span>
              )}
            </div>
            <DialogTitle className="text-2xl font-bold leading-tight mb-2">
              {selectedHeadline?.headline}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-2">
            {selectedHeadline?.image && (
              <ImageWithFallback
                src={selectedHeadline.image}
                alt={selectedHeadline.headline}
                className="w-full h-64 object-cover rounded-lg mb-6 border border-gray-200"
              />
            )}
            
            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Published {selectedHeadline?.timestamp}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Popularity Score: <strong className="text-gray-900">{selectedHeadline?.popularity}</strong>/10</span>
              </div>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p>
                This is a detailed view for the article "{selectedHeadline?.headline}". 
                In a full application, this section would contain the complete text of the article or an expanded summary,
                along with related media, author information, and interactive elements.
              </p>
              <p className="mt-4">
                The content here provides deeper insights into the topic, covering aspects related to {selectedHeadline?.category.toLowerCase()}
                as reported by {selectedHeadline?.publisher}.
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => {
                  toast(`Opening full article: "${selectedHeadline?.headline}" on ${selectedHeadline?.publisher}`);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#c58ae6] hover:bg-[#b179e0] text-white rounded-md transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read Full Article</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}