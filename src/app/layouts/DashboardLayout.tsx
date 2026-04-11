import { Outlet } from "react-router";
import { Sidebar } from "../components/layout/Sidebar";
import { TopNav } from "../components/layout/TopNav";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <TopNav />
      <div className="flex flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1 py-8 pl-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}