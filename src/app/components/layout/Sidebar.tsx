import { NavLink } from "react-router";
import { cn } from "../../../lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  CheckSquare, 
  PlusCircle, 
  BookOpen, 
  Award, 
  LogOut,
  Settings,
  Leaf
} from "lucide-react";

export function Sidebar() {
  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Overview", to: "/expert" },
    { icon: MessageSquare, label: "Answer Questions", to: "/expert/answer" },
    { icon: CheckSquare, label: "Review Answers", to: "/expert/review" },
    { icon: PlusCircle, label: "Submit Plant Info", to: "/expert/submit" },
    { icon: BookOpen, label: "Create Guide", to: "/expert/create-guide" },
    { icon: Award, label: "Badges & Experience", to: "/expert/badges" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="flex-1 py-6 px-4">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Expert Dashboard
        </div>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1",
                  isActive
                    ? "bg-[#E8F5E9] text-[#2E7D32]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-50">
        <nav className="space-y-1">
           <NavLink
              to="/expert/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Settings size={18} />
              Settings
            </NavLink>
             <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut size={18} />
              Log Out
            </button>
        </nav>
      </div>
    </aside>
  );
}
