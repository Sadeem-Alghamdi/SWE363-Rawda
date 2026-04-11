import { useNavigate } from "react-router";
import { StatCard } from "../components/dashboard/StatCard";
import { QuestionCard, QuestionProps } from "../components/dashboard/QuestionCard";
import { ReviewCard, ReviewProps } from "../components/dashboard/ReviewCard";
import { MessageSquare, CheckCircle2, Award, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/Button";

const stats = [
  { label: "Total Answers", value: "1,248", icon: MessageSquare, trend: { value: 12, isUp: true } },
  { label: "Verified Answers", value: "856", icon: CheckCircle2, trend: { value: 5, isUp: true } },
  { label: "Earned Badges", value: "14", icon: Award, trend: { value: 2, isUp: true } },
];

const recentQuestions: QuestionProps[] = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMjI5MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Beginner"
    },
    title: "Why are my Monstera leaves turning yellow?",
    excerpt: "I've been watering it once a week, but the bottom leaves are starting to yellow and drop off. Is it getting too much sun?",
    tags: ["Monstera", "Indoor Plants", "Yellow Leaves"],
    postedAt: "2 hours ago",
    likes: 24,
    comments: 5
  },
  {
    id: "2",
    author: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMjY3NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Senior"
    },
    title: "Best companion plants for tomatoes in a small raised bed?",
    excerpt: "I have a 4x4 raised bed and want to maximize yield. What grows well with tomatoes to prevent pests?",
    tags: ["Vegetable Garden", "Companion Planting", "Tomatoes"],
    postedAt: "5 hours ago",
    likes: 18,
    comments: 8
  },
  {
    id: "3",
    author: {
      name: "Mark Thompson",
      avatar: "https://images.unsplash.com/photo-1751058127279-46162ab88991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjMyMDg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Beginner"
    },
    title: "Identifying this strange bug on my rose bush",
    excerpt: "Found these small green insects clustered on the new buds. Are they aphids? How do I treat them organically?",
    tags: ["Pest Control", "Roses", "Organic Gardening"],
    postedAt: "1 day ago",
    likes: 42,
    comments: 15
  }
];

const pendingReviews: ReviewProps[] = [
  { id: "101", title: "Guide: Pruning Hydrangeas for Beginners", status: "Pending", submittedAt: "Yesterday", type: "Guide" },
  { id: "102", title: "Plant Info: Snake Plant (Sansevieria)", status: "Pending", submittedAt: "2 days ago", type: "Plant Info" },
  { id: "103", title: "Answer: How to fix clay soil?", status: "Pending", submittedAt: "3 days ago", type: "Answer" },
];

export default function DashboardHome() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Sarah! 🌿</h1>
          <p className="text-gray-500 mt-1">Here's what's happening in your garden community today.</p>
        </div>
        <Button 
          className="bg-[#4CAF50] text-white hover:bg-[#43A047]"
          onClick={() => navigate("/expert/create-guide")}
        >
          <span className="mr-2">+</span> Create New Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Questions</h2>
            <Button 
              variant="ghost" 
              className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm"
              onClick={() => navigate("/expert/answer")}
            >
              View All <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentQuestions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Pending Reviews</h2>
            <Button 
              variant="ghost" 
              className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm"
              onClick={() => navigate("/expert/review")}
            >
              See All
            </Button>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1">
             <div className="divide-y divide-gray-50">
              {pendingReviews.map((review) => (
                <div key={review.id} className="p-2">
                   <ReviewCard review={review} />
                </div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-50">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-gray-500 hover:text-gray-700"
                onClick={() => navigate("/expert/review")}
              >
                View 5 more pending items
              </Button>
            </div>
          </div>

          <div className="bg-[#E8F5E9] rounded-xl p-6 border border-[#C8E6C9]">
            <h3 className="font-bold text-[#2E7D32] mb-2">Weekly Challenge 🏆</h3>
            <p className="text-sm text-[#388E3C] mb-4">
              Answer 10 questions about "Spring Planting" to earn the Seasonal Expert badge!
            </p>
            <div className="w-full bg-white/50 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-[#4CAF50] h-2 rounded-full w-[70%]"></div>
            </div>
            <div className="flex justify-between text-xs text-[#388E3C] font-medium">
              <span>7/10 Answered</span>
              <span>3 to go!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}