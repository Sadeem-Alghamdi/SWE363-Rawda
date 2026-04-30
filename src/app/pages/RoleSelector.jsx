import { Link } from "react-router";

export default function RoleSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#4CAF50] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">🌿</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Rawda</h1>
          <p className="text-xl text-gray-600">Your Plant Care Companion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gardening Expert Card */}
          <Link
            to="/expert/login"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4CAF50] transition-colors">
              <span className="text-3xl group-hover:scale-110 transition-transform">🎓</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Gardening Expert</h2>
            <p className="text-gray-600 mb-6">
              Share your expertise, answer questions, create guides, and help the community grow their gardening knowledge.
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#4CAF50]">✓</span>
                <span>Answer community questions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4CAF50]">✓</span>
                <span>Create plant care guides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4CAF50]">✓</span>
                <span>Review answers & earn badges</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4CAF50]">✓</span>
                <span>Submit plant information</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[#4CAF50] font-medium">
              <span>Enter Expert Dashboard</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Home Gardener Card */}
          <Link
            to="/gardener/login"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
              <span className="text-3xl group-hover:scale-110 transition-transform">🏡</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Home Gardener</h2>
            <p className="text-gray-600 mb-6">
              Get help with your plants, find care services, learn from guides, and connect with expert gardeners.
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>Chat with Plant Care Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>Ask questions in Q&A Forum</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>Browse plant care guides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>Find nearby care services</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-blue-500 font-medium">
              <span>Enter Gardener Dashboard</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Store Owner & Admin Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Store Owner */}
          <Link
            to="/store/login"
            className="block bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center group-hover:bg-opacity-30 transition-colors">
                  <span className="text-3xl">🏪</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Store Owner</h2>
                  <p className="text-orange-100 text-sm">Manage your plant store & services</p>
                </div>
              </div>
              <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Admin Panel */}
          <Link
            to="/admin/login"
            className="block bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white bg-opacity-10 rounded-xl flex items-center justify-center group-hover:bg-opacity-20 transition-colors">
                  <span className="text-3xl">🛡️</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Admin Panel</h2>
                  <p className="text-gray-300 text-sm">Manage users, moderate content, and control platform</p>
                </div>
              </div>
              <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

