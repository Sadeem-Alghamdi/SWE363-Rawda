import { useState } from "react";
import { Star, Trash2, CheckCircle, Filter } from "lucide-react";

interface Review {
  id: string;
  storeName: string;
  rating: number;
  reviewer: string;
  date: string;
  text: string;
  verified: boolean;
  flagged: boolean;
}

export default function StoreReviews() {
  const [filterType, setFilterType] = useState("all");
  const [toast, setToast] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      storeName: "Green Haven Plant Care",
      rating: 5,
      reviewer: "Sarah M.",
      date: "March 1, 2026",
      text: "Excellent service! Very professional and knowledgeable staff.",
      verified: true,
      flagged: false,
    },
    {
      id: "2",
      storeName: "Urban Jungle Services",
      rating: 2,
      reviewer: "John D.",
      date: "Feb 28, 2026",
      text: "Poor service, arrived late and didn't complete the work.",
      verified: false,
      flagged: true,
    },
    {
      id: "3",
      storeName: "Plant Doctor Mobile",
      rating: 4,
      reviewer: "Emma L.",
      date: "Feb 25, 2026",
      text: "Good service overall, would recommend.",
      verified: true,
      flagged: false,
    },
  ]);

  const toggleVerified = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r))
    );
    showToast("Review verification updated");
  };

  const removeReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast("Review removed successfully");
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterType === "verified") return review.verified;
    if (filterType === "flagged") return review.flagged;
    if (filterType === "low") return review.rating <= 2;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Ratings & Reviews</h1>
        <p className="text-gray-600">Manage and moderate plant store reviews</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All Reviews</option>
            <option value="verified">Verified Only</option>
            <option value="flagged">Flagged Reviews</option>
            <option value="low">Low Ratings (≤2 stars)</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{review.storeName}</h3>
                  {review.verified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      ✓ Verified
                    </span>
                  )}
                  {review.flagged && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      Flagged
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">{review.text}</p>
                <p className="text-sm text-gray-500">
                  By {review.reviewer} • {review.date}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => toggleVerified(review.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    review.verified
                      ? "text-green-600 bg-green-50"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                  title={review.verified ? "Verified" : "Mark as Verified"}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeReview(review.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Review"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
