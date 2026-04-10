import React from 'react';
import { Bell, Search, Star, MessageCircle, ChevronDown, User } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback'; // Using the provided utility for images

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-10 transition-all duration-300">
      <div className="flex items-center w-96 relative">
        <Search className="absolute left-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search questions, plants..."
          className="w-full bg-[#E8F5E9] pl-10 pr-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all placeholder-gray-500 text-gray-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="text-gray-600 w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
          <MessageCircle className="text-gray-600 w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-colors">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E8F5E9]">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#4CAF50] text-white p-0.5 rounded-full border-2 border-white" title="Verified Expert">
              <Star size={10} fill="white" />
            </div>
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Dr. Ahmed</p>
            <p className="text-xs text-[#4CAF50] font-medium">Master Expert</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
