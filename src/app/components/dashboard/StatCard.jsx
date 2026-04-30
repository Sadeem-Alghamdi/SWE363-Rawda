import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ label, value, trend, icon: Icon }) => {
  const trendValue = trend?.value;
  const trendUp = trend?.isUp;

  return (
    <div className="bg-white rounded-lg p-5 border flex items-start justify-between min-w-[220px] flex-1">
      <div>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>

        <div className="flex items-center mt-3 gap-2 text-xs">
          <span className={trendUp ? "text-green-700 flex items-center" : "text-red-700 flex items-center"}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}%
          </span>
          <span className="text-gray-400">this week</span>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-gray-100 text-gray-700">
        <Icon size={23} />
      </div>
    </div>
  );
};

export default StatCard;