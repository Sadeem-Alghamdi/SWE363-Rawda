import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link, useParams } from "react-router";



export default function ForumQuestionDetail() {
  const { id } = useParams();
  const [newAnswer, setNewAnswer] = useState("");
  const [toast, setToast] = useState(null);

  const question = {
    id: id || "1",
    title: "Why are my tomato plant leaves turning yellow?",
    content: "I've been growing tomatoes in my backyard for about 3 weeks now, and I've noticed that the bottom leaves are starting to turn yellow. The top leaves still look healthy and green. I water them every other day and they get about 6 hours of sunlight. What could be causing this? Is it normal or should I be worried?",
    tags: ["tomatoes", "outdoor", "troubleshooting"],
    likes: 24,
    author: "Sarah M.",
    timestamp: "2 hours ago",
  };

  const [answers] = useState([
    {
      id: "1",
      author: "Expert Gardener John",
      content: "This is actually quite normal! Lower leaves on tomato plants often yellow and drop off as the plant matures. This is called senescence. However, make sure you're not overwatering - every other day might be too much depending on your climate and soil type. Check if the soil is dry 2 inches down before watering.",
      likes: 18,
      timestamp: "1 hour ago",
      isExpert: true,
    },
    {
      id: "2",
      author: "PlantLover23",
      content: "I had the same issue last month! Mine turned out to be a nitrogen deficiency. Try adding some compost or a balanced fertilizer. The yellowing stopped after I started fertilizing every 2 weeks.",
      likes: 12,
      timestamp: "45 minutes ago",
      isExpert: false,
    },
    {
      id: "3",
      author: "GreenThumb Master",
      content: "Could also be early blight, which is a fungal disease. Check if there are any brown spots on the yellow leaves. If so, remove the affected leaves and avoid watering from above. Water at the base of the plant instead.",
      likes: 9,
      timestamp: "30 minutes ago",
      isExpert: true,
    },
  ]);

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return;
    setNewAnswer("");
    showToast("Answer posted successfully!");
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/gardener/forum"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Forum</span>
      </Link>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">{question.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => showToast("Question liked!")}
            className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">{question.likes}</span>
          </button>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{question.content}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="font-medium">{question.author}</span>
            <span>•</span>
            <span>{question.timestamp}</span>
          </div>
          <button
            onClick={() => showToast("Link copied to clipboard!")}
            className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-[#4CAF50] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Answers Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div key={answer.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {answer.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{answer.author}</span>
                    {answer.isExpert && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        ✓ Expert
                      </span>
                    )}
                    <span className="text-sm text-gray-500">• {answer.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">{answer.content}</p>
                  <button
                    onClick={() => showToast("Answer liked!")}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{answer.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Answer Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Share your knowledge or experience..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent mb-4"
        />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Be respectful and helpful in your answer
          </p>
          <button
            onClick={handleSubmitAnswer}
            disabled={!newAnswer.trim()}
            className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Post Answer
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}


