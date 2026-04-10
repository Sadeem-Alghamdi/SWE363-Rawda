import { LucideIcon } from "lucide-react";

export function StatCard({ label, value, icon: Icon, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-[#E8F5E9] p-3 rounded-lg text-[#2E7D32]">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.isUp ? "text-green-600" : "text-red-500"}`}>
            {trend.isUp ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
}
