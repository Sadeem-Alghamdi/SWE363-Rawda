import React from 'react';
import { BadgeCheck, Clock, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

const QuestionCard = ({ title, user, time, tags, upvotes, id }: {
  title: string;
  user: string;
  time: string;
  tags: string[];
  upvotes: number;
  id: string;
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight line-clamp-2">{title}</h3>
        <span className="bg-[#E8F5E9] text-[#4CAF50] px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-3">
          New
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 gap-4 mt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${user}&background=random`} alt={user} className="w-full h-full" />
          </div>
          <span className="font-medium text-gray-700">{user}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Clock size={14} />
          {time}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md font-medium border border-gray-100">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-[#4CAF50] transition-colors">
          <ThumbsUp size={16} />
          <span className="font-medium">{upvotes}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
