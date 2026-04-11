import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, MessageSquare, Star, Users, Calendar, Settings, LogOut, Sprout } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Questions', path: '/questions' },
    { icon: Star, label: 'Reviews', path: '/reviews' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full fixed left-0 top-0 bottom-0 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white">
          <Sprout size={24} />
        </div>
        <div>
          <h1 className="font-bold text-xl text-gray-800 tracking-tight">Rawda</h1>
          <p className="text-xs text-gray-500 font-medium">Expert Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium',
                isActive
                  ? 'bg-[#E8F5E9] text-[#4CAF50]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              )
            }
          >
            <item.icon
              size={20}
              className={clsx('transition-colors', {
                'text-[#4CAF50]': true, // Keep icon colored or maybe allow it to change
              })} 
            />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 w-full rounded-lg transition-colors font-medium">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
