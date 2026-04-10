import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  MessageSquare, 
  Star, 
  FileCheck, 
  CreditCard, 
  Award,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/admin/dashboard" && location.pathname === "/admin/dashboard") return true;
    if (path !== "/admin/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Manage Users", icon: Users },
    { path: "/admin/experts", label: "Expert Applications", icon: UserCheck },
    { path: "/admin/forum", label: "Forum Moderation", icon: MessageSquare },
    { path: "/admin/reviews", label: "Store Reviews", icon: Star },
    { path: "/admin/content", label: "Content Approval", icon: FileCheck },
    { path: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
    { path: "/admin/badges", label: "Badges System", icon: Award },
  ];

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🛡️</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Rawda Admin</h1>
                <p className="text-xs text-gray-600">Control Panel</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Logout */}
            <button 
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-[73px]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 bottom-0 top-[73px] overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] bg-black bg-opacity-50 z-40">
            <aside className="w-64 bg-white h-full overflow-y-auto">
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
