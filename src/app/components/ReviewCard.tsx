import React from 'react';
import { Star, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const ReviewCard = ({ name, title, description, rating, date }: {
  name: string;
  title: string;
  description: string;
  rating: number;
  date: string;
}) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4"
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
        <ImageWithFallback 
          src={`https://ui-avatars.com/api/?name=${name}&background=random`} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-gray-900 truncate">{title}</h4>
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">{date}</span>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
            />
          ))}
          <span className="text-xs text-gray-400 ml-1 font-medium">by {name}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
          {description}
        </p>

        <div className="flex gap-2 justify-end">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
            <XCircle size={14} />
            Reject
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors border border-green-100">
            <CheckCircle size={14} />
            Approve
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
