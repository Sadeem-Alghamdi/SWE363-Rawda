import { useState } from "react";
import QuestionCard from "../components/dashboard/QuestionCard";
import { Button } from "../components/ui/Button";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const allQuestions = [
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
  },
  {
    id: "4",
    author: {
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBnbGFzc2VzfGVufDF8fHx8MTc3MjMyMDg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Intermediate"
    },
    title: "How often should I water my succulents in winter?",
    excerpt: "I know they need less water, but I'm afraid of overwatering or underwatering them. My house is kept at 68 degrees.",
    tags: ["Succulents", "Winter Care", "Watering"],
    postedAt: "1 day ago",
    likes: 12,
    comments: 3
  },
  {
    id: "5",
    author: {
      name: "David Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBzbWlsaW5nfGVufDF8fHx8MTc3MjMyMDg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Advanced"
    },
    title: "Suggestions for shade-loving perennials zone 5?",
    excerpt: "I have a very shady spot under a large oak tree. Looking for color and texture that will come back every year.",
    tags: ["Shade Garden", "Perennials", "Zone 5"],
    postedAt: "2 days ago",
    likes: 35,
    comments: 10
  }
];

export default function AnswerQuestions() {
  const [filter, setFilter] = useState("Recommended");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Answer Questions</h1>
          <p className="text-gray-500 mt-1">Help the community by sharing your expertise.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search topics..." 
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 w-full md:w-64"
             />
           </div>
           <Button variant="outline" className="border-gray-200 text-gray-700 gap-2">
             <Filter size={16} /> Filter
           </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto pb-1">
        {["Recommended", "Newest", "No Answers", "Urgent", "My Topics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              filter === tab
                ? "border-[#4CAF50] text-[#2E7D32]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {allQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
          <Button variant="ghost" className="w-full text-green-600 hover:bg-green-50 py-4 mt-4">
            Load More Questions
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#E8F5E9] rounded-xl p-6 border border-[#C8E6C9]">
            <h3 className="font-bold text-[#2E7D32] mb-2 flex items-center gap-2">
              <SlidersHorizontal size={18} />
              Your Expertise
            </h3>
            <p className="text-sm text-[#388E3C] mb-4">
              We recommend questions based on your selected tags.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Vegetables", "Pest Control", "Soil Health", "Indoor Plants"].map(tag => (
                <span key={tag} className="bg-white/60 text-[#2E7D32] px-2 py-1 rounded text-xs font-medium border border-[#A5D6A7]">
                  {tag}
                </span>
              ))}
              <button className="bg-white/60 text-[#2E7D32] px-2 py-1 rounded text-xs font-medium border border-dashed border-[#A5D6A7] hover:bg-white transition-colors">
                + Add Tag
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
             <h3 className="font-bold text-gray-900 mb-4">Top Contributors this Week</h3>
             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-600">
                      {i}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-${i === 1 ? '1535713875002-d1d0cf377fde' : i === 2 ? '1580489944761-15a19d654956' : '1531123897727-8f129e1688ce'}?auto=format&fit=crop&w=100&q=80`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-sm font-medium text-gray-900 truncate">Gardener {i}</p>
                       <p className="text-xs text-gray-500">{50 - i * 5} Answers</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

