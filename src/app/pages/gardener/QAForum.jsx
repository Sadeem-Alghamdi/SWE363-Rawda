import { useState } from "react";
import { ArrowLeft, Search, Plus, Heart, MessageCircle, Bookmark, TrendingUp } from "lucide-react";
import { Link } from "react-router";



export default function QAForum() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoggedIn] = useState(true); // Set to false to test login modal

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "watering", label: "Watering" },
    { id: "pests", label: "Pests & Diseases" },
    { id: "indoor", label: "Indoor Plants" },
    { id: "outdoor", label: "Outdoor Plants" },
    { id: "soil", label: "Soil & Fertilizer" },
  ];

  const [questions, setQuestions] = useState([
    {
      id: "1",
      title: "Why are my tomato plant leaves turning yellow?",
      content: "I've been growing tomatoes for 3 weeks and the bottom leaves are yellowing...",
      tags: ["tomatoes", "outdoor", "troubleshooting"],
      likes: 24,
      answerCount: 8,
      isBookmarked: false,
      author: "Sarah M.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Best fertilizer for succulents?",
      content: "Looking for recommendations on fertilizing my succulent collection...",
      tags: ["succulents", "fertilizer", "indoor"],
      likes: 18,
      answerCount: 12,
      isBookmarked: true,
      author: "Mike Johnson",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      title: "How to propagate pothos in water?",
      content: "I want to propagate my pothos plant. What's the best method?",
      tags: ["pothos", "propagation", "indoor"],
      likes: 45,
      answerCount: 15,
      isBookmarked: false,
      author: "Emma Lee",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      title: "Dealing with aphids on roses",
      content: "My roses have an aphid infestation. What are some organic solutions?",
      tags: ["roses", "pests", "outdoor"],
      likes: 31,
      answerCount: 10,
      isBookmarked: false,
      author: "David Chen",
      timestamp: "1 day ago",
    },
  ]);

  const handleLike = (questionId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, likes: q.likes + 1 } : q))
    );
    showToast("Question liked!");
  };

  const handleBookmark = (questionId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
    showToast("Saved successfully.");
  };

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowPostModal(true);
  };

  const submitPost = () => {
    setShowPostModal(false);
    showToast("Posted successfully.");
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === "all" || q.tags.includes(selectedCategory);
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to="/gardener" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Q&A Forum</h1>
              <p className="text-sm text-gray-600">Ask questions and share knowledge with the community</p>
            </div>
          </div>
          <button
            onClick={handleCreatePost}
            className="flex items-center gap-2 px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Ask Question
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#4CAF50] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 border border-orange-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <h2 className="font-semibold text-gray-900">Trending This Week</h2>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">🔥 How to prepare garden for winter</p>
          <p className="text-sm text-gray-700">🔥 Best low-light indoor plants</p>
          <p className="text-sm text-gray-700">🔥 Organic pest control methods</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Link to={`/gardener/forum/${question.id}`} className="group">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#4CAF50] transition-colors">
                    {question.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-3 line-clamp-2">{question.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{question.author}</span>
                  <span>•</span>
                  <span>{question.timestamp}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(question.id)}
                    className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{question.likes}</span>
                  </button>
                  <button
                    onClick={() => handleBookmark(question.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      question.isBookmarked
                        ? "text-[#4CAF50] bg-green-50"
                        : "text-gray-400 hover:text-[#4CAF50] hover:bg-gray-50"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" fill={question.isBookmarked ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{question.answerCount} answers</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Previous
        </button>
        <button className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg">1</button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Next
        </button>
      </div>

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Login Required</h3>
            <p className="text-gray-600 mb-6">Please log in to interact with questions and posts.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors">
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ask a Question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="What's your question?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Provide more details about your question..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="e.g., watering, indoor, pests"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPost}
                  className="flex-1 px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
                >
                  Post Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}


