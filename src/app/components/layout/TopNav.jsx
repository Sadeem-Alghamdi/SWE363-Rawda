import { Link } from "react-router";
import { Bell, Search, Leaf } from "lucide-react";

export function TopNav() {
  const userName = "Sadeem";
  const userRole = "Expert";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/expert" className="flex items-center gap-2 text-green-700 font-bold text-xl">
            <div className="bg-green-500 p-1.5 rounded-lg text-white">
              <Leaf size={20} />
            </div>
            Rawda
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/expert/answer" className="text-gray-600 hover:text-green-700">
              Q&A Forum
            </Link>
            <Link to="/expert/create-guide" className="text-gray-600 hover:text-green-700">
              Guides
            </Link>
            <Link to="/expert/submit" className="text-gray-600 hover:text-green-700">
              Plant Library
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md bg-gray-100 px-9 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <button className="relative text-gray-500 hover:text-green-700 p-2">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="hidden sm:flex items-center gap-3 p-1">
            <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
              {userName.charAt(0)}
            </div>
            <div className="text-left leading-tight">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}