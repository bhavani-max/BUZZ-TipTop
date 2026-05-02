import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, User, Settings, LogOut, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { QuizWindow } from "./QuizWindow";
import { toast } from "sonner";

export function Header({ activeTab = "Dashboard", setActiveTab = (tab: string) => {} }: { activeTab?: string, setActiveTab?: (tab: string) => void }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#c58ae6] to-[#9f5bd1] rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Bu<span style={{ color: '#c58ae6' }}>zz</span>
              </h1>
              <p className="text-xs text-gray-500">a part of B360u</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 ml-8">
            {["Dashboard", "Analytics", "Sources", "Reports"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors ${activeTab === tab ? "text-[#c58ae6]" : "text-gray-700 hover:text-[#c58ae6]"}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <QuizWindow />
          
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100" onClick={() => toast.info("You have 3 new notifications!")}>
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              3
            </Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#c58ae6] text-white font-medium">
                    A
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@rytstory.com</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@rytstory.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast("Opening Profile Settings...")}>
                <User className="w-4 h-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast("Opening Preferences...")}>
                <Settings className="w-4 h-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast("Viewing Notifications...")}>
                <Bell className="w-4 h-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600" onClick={() => toast.success("Signed out successfully.")}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => toast("Mobile menu opened")}>
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}