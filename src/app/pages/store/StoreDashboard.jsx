import { useNavigate } from "react-router";
import { TrendingUp, Package, DollarSign, Star, Inbox, AlertCircle } from "lucide-react";

export default function StoreDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Products", value: "127", change: "+5 this month", icon: Package, color: "bg-blue-100 text-blue-600" },
    { label: "Active Services", value: "8", change: "3 bookings pending", icon: Inbox, color: "bg-green-100 text-green-600" },
    { label: "Average Rating", value: "4.8", change: "From 156 reviews", icon: Star, color: "bg-yellow-100 text-yellow-600" },
    { label: "Monthly Revenue", value: "$12,450", change: "+18% from last month", icon: DollarSign, color: "bg-orange-100 text-orange-600" },
  ];

  const recentRequests = [
    { customer: "Sarah Martinez", service: "Plant Care (7 days)", date: "March 1, 2026", status: "Pending" },
    { customer: "John Smith", service: "Plant Care (14 days)", date: "Feb 28, 2026", status: "Accepted" },
    { customer: "Emma Wilson", service: "Plant Care (3 days)", date: "Feb 27, 2026", status: "Completed" },
  ];

  const lowStockProducts = [
    { name: "Monstera Deliciosa", stock: 3, category: "Indoor Plants" },
    { name: "Snake Plant", stock: 5, category: "Indoor Plants" },
    { name: "Organic Fertilizer", stock: 2, category: "Supplies" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Overview</h1>
        <p className="text-gray-600">Welcome back! Here's your store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Service Requests</h2>
            <button onClick={() => navigate("/store/requests")} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{request.customer}</p>
                  <p className="text-sm text-gray-600">{request.service}</p>
                  <p className="text-xs text-gray-500 mt-1">{request.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                  request.status === "Accepted" ? "bg-green-100 text-green-700" :
                  "bg-gray-100 text-gray-700"
                }`}>{request.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
          </div>
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">{product.stock}</p>
                  <p className="text-xs text-gray-500">units left</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/store/products")}
            className="w-full mt-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Manage Inventory
          </button>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Add Product", desc: "Manage inventory", path: "/store/products" },
            { label: "Create Service", desc: "Offer plant care", path: "/store/services" },
            { label: "View Requests", desc: "3 pending", path: "/store/requests" },
            { label: "Check Reviews", desc: "156 total reviews", path: "/store/ratings" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all text-left"
            >
              <p className="font-medium text-white">{action.label}</p>
              <p className="text-sm text-orange-100 mt-1">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}