import { useState } from "react";
import ReviewCard from "../components/dashboard/ReviewCard";
import { Button } from "../components/ui/Button";
import { Search, Filter, History, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

const initialPending = [
  { id: "101", title: "Guide: Pruning Hydrangeas for Beginners", status: "Pending", submittedAt: "Yesterday", type: "Guide" },
  { id: "102", title: "Plant Info: Snake Plant (Sansevieria)", status: "Pending", submittedAt: "2 days ago", type: "Plant Info" },
  { id: "103", title: "Answer: How to fix clay soil?", status: "Pending", submittedAt: "3 days ago", type: "Answer" },
  { id: "104", title: "Guide: Companion Planting Chart", status: "Pending", submittedAt: "4 days ago", type: "Guide" },
  { id: "105", title: "Plant Info: Monstera Deliciosa", status: "Pending", submittedAt: "5 days ago", type: "Plant Info" },
];

const initialHistory = [
  { id: "201", title: "Guide: Growing Tomatoes in Pots", status: "Approved", submittedAt: "Last Week", type: "Guide" },
  { id: "202", title: "Answer: Identifying Aphids", status: "Rejected", submittedAt: "2 Weeks Ago", type: "Answer" },
];

export default function ReviewAnswers() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [pendingReviews, setPendingReviews] = useState(initialPending);
  const [historyReviews, setHistoryReviews] = useState(initialHistory);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("approve");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (review, type) => {
    setSelectedReview(review);
    setActionType(type);
    setShowDetailModal(false);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (!selectedReview) return;
    const newStatus = actionType === "approve" ? "Approved" : "Rejected";
    setPendingReviews((prev) => prev.filter((r) => r.id !== selectedReview.id));
    setHistoryReviews((prev) => [{ ...selectedReview, status: newStatus }, ...prev]);
    showToast(`Submission ${newStatus.toLowerCase()} successfully.`);
    setShowActionModal(false);
    setSelectedReview(null);
    setFeedbackNote("");
  };

  const filteredPending = pendingReviews.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Submissions</h1>
          <p className="text-gray-500 mt-1">Review content from other experts and community members.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 w-full md:w-64"
            />
          </div>
          <Button variant="outline" className="border-gray-200 text-gray-700 gap-2">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("Pending")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "Pending" ? "border-[#4CAF50] text-[#2E7D32] bg-green-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
          >
            <Clock size={16} /> Pending ({pendingReviews.length})
          </button>
          <button
            onClick={() => setActiveTab("History")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "History" ? "border-[#4CAF50] text-[#2E7D32] bg-green-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
          >
            <History size={16} /> History ({historyReviews.length})
          </button>
        </div>

        <div className="p-6 space-y-3">
          {activeTab === "Pending" ? (
            filteredPending.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending reviews found.</p>
            ) : (
              filteredPending.map((review) => (
                <div key={review.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{review.title}</p>
                    <span className="text-xs text-gray-400">{review.submittedAt} · {review.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setSelectedReview(review); setShowDetailModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleAction(review, "approve")} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleAction(review, "reject")} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            historyReviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{review.title}</p>
                  <span className="text-xs text-gray-400">{review.submittedAt} · {review.type}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${review.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {review.status}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
          <Button variant="ghost" className="text-gray-500 text-sm">Load More</Button>
        </div>
      </div>

      {showDetailModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Submission Details</h3>
            <div className="space-y-3 mb-6">
              <p><span className="font-medium">Title:</span> {selectedReview.title}</p>
              <p><span className="font-medium">Type:</span> {selectedReview.type}</p>
              <p><span className="font-medium">Submitted:</span> {selectedReview.submittedAt}</p>
              <p><span className="font-medium">Status:</span> {selectedReview.status}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDetailModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
              <button onClick={() => handleAction(selectedReview, "reject")} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Reject</button>
              <button onClick={() => handleAction(selectedReview, "approve")} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Approve</button>
            </div>
          </div>
        </div>
      )}

      {showActionModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {actionType === "approve" ? "Approve Submission" : "Reject Submission"}
            </h3>
            <p className="text-gray-600 mb-4">{actionType === "approve" ? "Approve this submission and make it visible to users?" : "Reject this submission and notify the author?"}</p>
            {actionType === "reject" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback (Optional)</label>
                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  rows={3}
                  placeholder="Provide feedback to the author..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setShowActionModal(false); setFeedbackNote(""); }} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={confirmAction} className={`flex-1 px-4 py-2 text-white rounded-lg ${actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}