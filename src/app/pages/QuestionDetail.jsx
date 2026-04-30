import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { ArrowLeft, MessageSquare, ThumbsUp, Share2, MoreHorizontal, Send } from "lucide-react";

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(24);

  const question = {
    id: id || "1",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMjI5MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      level: "Beginner",
    },
    title: "Why are my Monstera leaves turning yellow?",
    content: "I've been watering it once a week, but the bottom leaves are starting to yellow and drop off. Is it getting too much sun? I have it near a south-facing window. The soil feels dry to the touch before I water it again. I'm worried it might be root rot or a nutrient deficiency.",
    tags: ["Monstera", "Indoor Plants", "Yellow Leaves"],
    postedAt: "2 hours ago",
    comments: 5,
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handlePostAnswer = () => {
    if (!answer.trim()) {
      showToast("Please write an answer before posting.");
      return;
    }
    setSubmitted(true);
    setAnswer("");
    showToast("Answer posted successfully!");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-gray-900 pl-0 hover:bg-transparent"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                <img src={question.author.avatar} alt={question.author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{question.author.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100">
                    {question.author.level}
                  </span>
                  <span>•</span>
                  <span>{question.postedAt}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </Button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
          <div className="text-gray-600 mb-6 leading-relaxed">
            <p>{question.content}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {question.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={handleLike}
                className={`gap-2 ${liked ? "text-green-600" : "text-gray-500 hover:text-green-600"}`}
              >
                <ThumbsUp size={18} />
                <span>{likes} Likes</span>
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-green-600 gap-2">
                <MessageSquare size={18} />
                <span>{question.comments} Comments</span>
              </Button>
            </div>
            <Button variant="ghost" onClick={handleShare} className="text-gray-500 hover:text-gray-900 gap-2">
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium">
          Your answer has been submitted and is pending review.
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Expert Answer</h3>
        <div className="space-y-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full min-h-[200px] p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-y outline-none transition-all text-gray-700"
            placeholder="Write your helpful answer here... Use clear language and step-by-step instructions if needed."
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Posting as <span className="font-semibold text-gray-900">Dr. Sarah</span>
            </p>
            <Button
              onClick={handlePostAnswer}
              disabled={!answer.trim()}
              className="bg-[#4CAF50] hover:bg-[#43A047] text-white gap-2 px-6 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              Post Answer
            </Button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}