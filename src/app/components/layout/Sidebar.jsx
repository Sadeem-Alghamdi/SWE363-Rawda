import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  Star,
  Users,
  Calendar,
  Settings,
  LogOut,
  Sprout,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/expert" },
    { icon: MessageSquare, label: "Questions", path: "/expert/answer" },
    { icon: Star, label: "Reviews", path: "/expert/review" },
    { icon: Users, label: "Community", path: "/expert/badges" },
    { icon: Calendar, label: "Schedule", path: "/expert/submit" },
    { icon: Settings, label: "Settings", path: "/expert/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
          <Sprout size={23} />
        </div>
        <div>
          <h1 className="font-bold text-xl text-gray-800">Rawda</h1>
          <p className="text-xs text-gray-500">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/expert"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-green-100 text-green-700"
                : "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 w-full rounded-lg">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;