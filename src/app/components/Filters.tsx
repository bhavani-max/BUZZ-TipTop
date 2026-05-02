import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Calendar, Filter, Download, RotateCcw } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  publisherFilter: string;
  setPublisherFilter: (publisher: string) => void;
}

export function Filters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  publisherFilter,
  setPublisherFilter
}: FiltersProps) {

  const getActiveFiltersCount = () => {
    let count = 0;
    if (categoryFilter !== 'all') count++;
    if (publisherFilter !== 'all') count++;
    return count;
  };

  const handleClearAll = () => {
    setCategoryFilter('all');
    setPublisherFilter('all');
    setSearchQuery('');
    toast.info("All filters cleared");
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">Filters & Search</h3>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => toast.success("Export started: Data is being prepared for download.")}
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => toast.success("Data refreshed with latest headlines.")}
              >
                <RotateCcw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            <Select value={publisherFilter} onValueChange={setPublisherFilter}>
              <SelectTrigger className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
                <SelectValue placeholder="All Publishers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Publishers</SelectItem>
                <SelectItem value="The New York Times">The New York Times</SelectItem>
                <SelectItem value="CNN">CNN</SelectItem>
                <SelectItem value="BBC News">BBC News</SelectItem>
                <SelectItem value="Reuters">Reuters</SelectItem>
                <SelectItem value="The Guardian">The Guardian</SelectItem>
                <SelectItem value="Financial Times">Financial Times</SelectItem>
                <SelectItem value="Associated Press">Associated Press</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="World">World News</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="video">Video Content</SelectItem>
                <SelectItem value="podcast">Podcasts</SelectItem>
                <SelectItem value="breaking">Breaking News</SelectItem>
                <SelectItem value="opinion">Opinion Pieces</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="global">Global</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-[#c58ae6] text-[#c58ae6] hover:bg-[#c58ae6] hover:text-white transition-colors bg-purple-50"
              onClick={() => toast.info("Date filter applied: This Month")}
            >
              <Calendar className="w-4 h-4" />
              This Month
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search headlines, publishers, or keywords..." 
              className="pl-10 bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white transition-colors h-10"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            <div className="flex gap-1 flex-wrap">
              {categoryFilter !== 'all' && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 cursor-pointer" onClick={() => setCategoryFilter('all')}>
                  {categoryFilter} ×
                </Badge>
              )}
              {publisherFilter !== 'all' && (
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 cursor-pointer" onClick={() => setPublisherFilter('all')}>
                  {publisherFilter} ×
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="bg-[#c58ae6]/10 text-[#c58ae6] border-[#c58ae6]/20 cursor-pointer" onClick={() => setSearchQuery('')}>
                  Search: "{searchQuery}" ×
                </Badge>
              )}
              {getActiveFiltersCount() === 0 && !searchQuery && (
                <span className="text-gray-400 italic">None</span>
              )}
            </div>
            {(getActiveFiltersCount() > 0 || searchQuery) && (
              <Button onClick={handleClearAll} variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 p-1 h-auto ml-2">
                Clear all
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}