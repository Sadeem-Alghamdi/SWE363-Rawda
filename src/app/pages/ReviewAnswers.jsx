import { useState } from "react";
import { ReviewCard, ReviewProps } from "../components/dashboard/ReviewCard";
import { Button } from "../components/ui/Button";
import { Search, Filter, History, Clock } from "lucide-react";

const pendingReviews: ReviewProps[] = [
  { id: "101", title: "Guide: Pruning Hydrangeas for Beginners", status: "Pending", submittedAt: "Yesterday", type: "Guide" },
  { id: "102", title: "Plant Info: Snake Plant (Sansevieria)", status: "Pending", submittedAt: "2 days ago", type: "Plant Info" },
  { id: "103", title: "Answer: How to fix clay soil?", status: "Pending", submittedAt: "3 days ago", type: "Answer" },
  { id: "104", title: "Guide: Companion Planting Chart", status: "Pending", submittedAt: "4 days ago", type: "Guide" },
  { id: "105", title: "Plant Info: Monstera Deliciosa", status: "Pending", submittedAt: "5 days ago", type: "Plant Info" },
];

const pastReviews: ReviewProps[] = [
    { id: "201", title: "Guide: Growing Tomatoes in Pots", status: "Approved", submittedAt: "Last Week", type: "Guide" },
    { id: "202", title: "Answer: Identifying Aphids", status: "Rejected", submittedAt: "2 Weeks Ago", type: "Answer" },
];

export default function ReviewAnswers() {
  const [activeTab, setActiveTab] = useState("Pending");

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
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Pending"
                ? "border-[#4CAF50] text-[#2E7D32] bg-green-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Clock size={16} /> Pending ({pendingReviews.length})
          </button>
          <button
            onClick={() => setActiveTab("History")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "History"
                ? "border-[#4CAF50] text-[#2E7D32] bg-green-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <History size={16} /> History
          </button>
        </div>
        
        <div className="p-6 space-y-4">
            {activeTab === "Pending" ? (
                pendingReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))
            ) : (
                pastReviews.map((review) => (
                     <ReviewCard key={review.id} review={review} />
                ))
            )}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
             <Button variant="ghost" className="text-gray-500 text-sm">Load More</Button>
        </div>
      </div>
    </div>
  );
}