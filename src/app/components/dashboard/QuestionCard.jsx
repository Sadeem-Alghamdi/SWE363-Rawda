import { useNavigate } from "react-router";
import { Button } from "../ui/Button";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function QuestionCard({ question }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-green-200 transition-all shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
              <ImageWithFallback 
                src={question.author.avatar} 
                alt={question.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-green-50 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full border border-white font-medium shadow-sm">
              {question.author.level}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{question.author.name}</h4>
            <span className="text-xs text-gray-500">{question.postedAt}</span>
          </div>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          New
        </span>
      </div>
      
      <h3 
        onClick={() => navigate(`/expert/question/${question.id}`)}
        className="text-lg font-bold text-gray-800 mb-2 hover:text-green-700 cursor-pointer transition-colors"
      >
        {question.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
        {question.excerpt}
      </p>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <div className="flex flex-wrap gap-2">
          {question.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-gray-400 text-xs font-medium shrink-0 ml-2">
          <div className="flex items-center gap-1 hover:text-gray-600 transition-colors cursor-default">
            <ThumbsUp size={14} />
            <span>{question.likes}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-gray-600 transition-colors cursor-default">
            <MessageCircle size={14} />
            <span>{question.comments}</span>
          </div>
          <Button 
            size="sm" 
            className="bg-[#4CAF50] hover:bg-[#43A047] text-white ml-2 rounded-full px-5 shadow-sm hover:shadow"
            onClick={() => navigate(`/expert/question/${question.id}`)}
          >
            Answer
          </Button>
        </div>
      </div>
    </div>
  );
}
