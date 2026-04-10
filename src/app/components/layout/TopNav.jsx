import { Link } from "react-router";
import { cn } from "../../../lib/utils";
import { Bell, Search, Leaf } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function TopNav() {
  const profileImage = "https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWwlMjBzbWlsaW5nfGVufDF8fHx8MTc3MjMyMDgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-[#2E7D32] font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="bg-[#4CAF50] p-1.5 rounded-lg text-white">
              <Leaf size={20} className="fill-current" />
            </div>
            Rawda
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/forum" className="text-gray-600 hover:text-green-700 transition-colors">Q&A Forum</Link>
            <Link to="/guides" className="text-gray-600 hover:text-green-700 transition-colors">Guides</Link>
            <Link to="/library" className="text-gray-600 hover:text-green-700 transition-colors">Plant Library</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search plants, questions..."
              className="w-full rounded-full bg-gray-50 border border-transparent px-9 py-2 text-sm outline-none focus:bg-white focus:border-green-200 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-gray-400"
            />
          </div>
          
          <button className="relative text-gray-500 hover:text-green-700 transition-colors p-2 rounded-full hover:bg-gray-50">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
          
          <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            <ImageWithFallback
              src={profileImage}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover border border-gray-100"
            />
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-semibold text-gray-900">Dr. Sarah</p>
              <p className="text-[10px] text-green-600 font-medium">Master Expert</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
