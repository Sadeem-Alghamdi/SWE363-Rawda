import React from 'react';
import { ArrowUpRight, ArrowDownRight, Icon as IconType } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: IconType;
  color: string; // e.g., 'text-blue-500 bg-blue-50'
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendUp, icon: Icon, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start justify-between min-w-[240px] flex-1"
    >
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
        
        <div className="flex items-center mt-3 gap-2">
          <span
            className={clsx(
              'flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
              trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            )}
          >
            {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            {trend}
          </span>
          <span className="text-xs text-gray-400">vs last week</span>
        </div>
      </div>

      <div className={clsx('p-3 rounded-xl', color)}>
        <Icon size={24} />
      </div>
    </motion.div>
  );
};

export default StatCard;
