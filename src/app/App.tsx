import { useState } from "react";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters"; 
import { HeadlinesTable } from "./components/HeadlinesTable";
import { SeverityWords } from "./components/SeverityWords";
import { Chatbot } from "./components/Chatbot";
import { Card } from "./components/ui/card";
import { TrendingUp, Users, Globe, Clock } from "lucide-react";
import { Toaster } from "sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publisherFilter, setPublisherFilter] = useState("all");

  const stats = [
    {
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      label: "Total Articles",
      value: "12,847",
      change: "+8.2%",
      changeType: "positive"
    },
    {
      icon: <Users className="w-5 h-5 text-green-600" />,
      label: "Active Sources",
      value: "247",
      change: "+2.1%", 
      changeType: "positive"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      label: "Avg. Popularity",
      value: "7.3",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      icon: <Clock className="w-5 h-5 text-orange-600" />,
      label: "Last Update",
      value: "2 min",
      change: "Real-time",
      changeType: "neutral"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "Dashboard" ? (
        <>
          <Filters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            publisherFilter={publisherFilter}
            setPublisherFilter={setPublisherFilter}
          />
          
          {/* Stats Overview */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HeadlinesTable 
                  searchQuery={searchQuery}
                  categoryFilter={categoryFilter}
                  publisherFilter={publisherFilter}
                />
              </div>
              
              <div className="lg:col-span-1 space-y-6">
                <SeverityWords />
                
                {/* Additional Analytics Card */}
                <Card className="p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Quick Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Breaking News</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/4 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Politics</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Technology</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-2/5 h-2 bg-[#c58ae6] rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sports</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/3 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{activeTab}</h2>
            <p className="text-gray-500">This section is currently under development.</p>
          </div>
        </div>
      )}
      
      <Chatbot />
    </div>
  );
}