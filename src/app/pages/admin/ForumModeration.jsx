import { useState } from "react";
import { AlertTriangle, Eye, Trash2, AlertCircle, CheckCircle } from "lucide-react";



export default function ForumModeration() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("remove");
  const [toast, setToast] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Inappropriate language in plant discussion",
      author: "User123",
      date: "March 1, 2026",
      reports: 5,
      status: "Active",
      content: "This is a sample post content that has been reported...",
    },
    {
      id: "2",
      title: "Spam link in comment section",
      author: "SpamBot99",
      date: "Feb 28, 2026",
      reports: 12,
      status: "Active",
      content: "Check out this link for plant supplies...",
    },
    {
      id: "3",
      title: "Off-topic political discussion",
      author: "GardenTalk",
      date: "Feb 27, 2026",
      reports: 3,
      status: "Warned",
    },
  ]);

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleAction = (post, type) => {
    setSelectedPost(post);
    setActionType(type);
    setShowDetailModal(false);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (selectedPost) {
      if (actionType === "remove") {
        setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
        showToast("Post removed successfully");
      } else if (actionType === "warn") {
        setPosts((prev) =>
          prev.map((p) => (p.id === selectedPost.id ? { ...p, status: "Warned" } : p))

        );
        showToast("Warning sent to user");
      } else {
        setPosts((prev) =>
          prev.map((p) => (p.id === selectedPost.id ? { ...p, reports: 0 } : p))
        );
        showToast("Post marked as safe");
      }
      setShowActionModal(false);
      setSelectedPost(null);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forum Moderation</h1>
        <p className="text-gray-600">Review reported posts and manage community content</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Post Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reports</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{post.author}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{post.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {post.reports}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        post.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : post.status === "Warned"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewPost(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(post, "remove")}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(post, "warn")}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Warn User"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(post, "safe")}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark Safe"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Post Details</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{selectedPost.reports} reports</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                By {selectedPost.author} • {selectedPost.date}
              </p>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">{selectedPost.title}</h4>
              <p className="text-gray-700">{selectedPost.content}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleAction(selectedPost, "safe")}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mark Safe
              </button>
              <button
                onClick={() => handleAction(selectedPost, "warn")}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Warn User
              </button>
              <button
                onClick={() => handleAction(selectedPost, "remove")}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Action</h3>
            <p className="text-gray-600 mb-6">
              {actionType === "remove" && "Remove this post permanently?"}
              {actionType === "warn" && "Send a warning to the user?"}
              {actionType === "safe" && "Mark this post as safe and clear reports?"}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  actionType === "remove"
                    ? "bg-red-600 hover:bg-red-700"
                    : actionType === "warn"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}


