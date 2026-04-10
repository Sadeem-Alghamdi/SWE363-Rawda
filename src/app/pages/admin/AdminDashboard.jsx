import { Users, UserCheck, MessageSquare, Star, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "2,547",
      change: "+12%",
      isPositive: true,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Experts",
      value: "186",
      change: "+8%",
      isPositive: true,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Forum Posts",
      value: "1,432",
      change: "+24%",
      isPositive: true,
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Pending Reviews",
      value: "23",
      change: "-5%",
      isPositive: false,
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const recentActivity = [
    { type: "user", message: "New user registration: Sarah Martinez", time: "5 min ago" },
    { type: "expert", message: "Expert application submitted by John Smith", time: "12 min ago" },
    { type: "forum", message: "Post reported in Q&A Forum", time: "23 min ago" },
    { type: "review", message: "New 5-star review for Green Haven Plant Care", time: "1 hour ago" },
    { type: "content", message: "Plant guide submitted for approval", time: "2 hours ago" },
  ];

  const pendingItems = [
    { title: "Expert Applications", count: 8, color: "text-green-600 bg-green-50" },
    { title: "Content Approvals", count: 15, color: "text-blue-600 bg-blue-50" },
    { title: "Reported Posts", count: 3, color: "text-red-600 bg-red-50" },
    { title: "Review Flags", count: 12, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Items */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Items</h2>
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div key={item.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  <span className={`px-3 py-1 ${item.color} rounded-full text-sm font-semibold`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === "user" ? "bg-blue-500" :
                    activity.type === "expert" ? "bg-green-500" :
                    activity.type === "forum" ? "bg-purple-500" :
                    activity.type === "review" ? "bg-yellow-500" :
                    "bg-orange-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all text-left">
            <p className="font-medium">Review Experts</p>
            <p className="text-sm opacity-80 mt-1">8 pending applications</p>
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all text-left">
            <p className="font-medium">Moderate Forum</p>
            <p className="text-sm opacity-80 mt-1">3 reported posts</p>
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all text-left">
            <p className="font-medium">Approve Content</p>
            <p className="text-sm opacity-80 mt-1">15 guides waiting</p>
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all text-left">
            <p className="font-medium">Manage Users</p>
            <p className="text-sm opacity-80 mt-1">2,547 total users</p>
          </button>
        </div>
      </div>
    </div>
  );
}
