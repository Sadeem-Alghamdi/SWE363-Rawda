import { Award, Star, Trophy, Target, TrendingUp, ShieldCheck } from "lucide-react";

const badges = [
  { id: 1, name: "Community Helper", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50", desc: "Answered 50 questions" },
  { id: 2, name: "Expert Writer", icon: Trophy, color: "text-purple-500", bg: "bg-purple-50", desc: "Published 10 guides" },
  { id: 3, name: "Plant Identifier", icon: Target, color: "text-blue-500", bg: "bg-blue-50", desc: "Identified 20 plants correctly" },
  { id: 4, name: "Top Reviewer", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50", desc: "Reviewed 30 submissions" },
];

const levels = [
  { level: 1, xp: 1000, current: 1000, done: true },
  { level: 2, xp: 2500, current: 2500, done: true },
  { level: 3, xp: 5000, current: 5000, done: true },
  { level: 4, xp: 10000, current: 7500, done: false },
  { level: 5, xp: 20000, current: 0, done: false },
];

export default function Badges() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Badges & Experience</h1>
        <p className="text-gray-500 mt-1">Track your progress and achievements as a gardening expert.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Current Level</h2>
            <span className="text-2xl font-bold text-green-600">Level 4</span>
          </div>
          
          <div className="mb-2 flex justify-between text-sm font-medium">
             <span className="text-gray-600">7,500 XP</span>
             <span className="text-gray-400">10,000 XP</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-6">
             <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full w-[75%] transition-all duration-1000 ease-out"></div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 relative mt-12">
             <div className="absolute top-[15px] left-0 w-full h-1 bg-gray-100 -z-10"></div>
             {levels.map((lvl) => (
                <div key={lvl.level} className="flex flex-col items-center">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${lvl.done ? 'bg-green-500 border-green-500 text-white' : lvl.current > 0 ? 'bg-white border-green-500 text-green-600' : 'bg-white border-gray-200 text-gray-400'}`}>
                      {lvl.level}
                   </div>
                   <span className={`text-xs mt-2 font-medium ${lvl.done || lvl.current > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {lvl.xp / 1000}k
                   </span>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] p-6 rounded-xl text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-1">Weekly Ranking</h3>
            <p className="text-green-100 text-sm mb-6">You are in the top 5% of experts this week!</p>
            
            <div className="flex items-end gap-2">
               <span className="text-4xl font-bold">#12</span>
               <span className="text-sm text-green-100 mb-1 flex items-center">
                 <TrendingUp size={14} className="mr-1" /> +3 positions
               </span>
            </div>
          </div>
          <Award className="absolute -bottom-4 -right-4 text-white opacity-10" size={120} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Earned Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className={`w-16 h-16 rounded-full ${badge.bg} ${badge.color} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <badge.icon size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-500">{badge.desc}</p>
            </div>
          ))}
           <div className="bg-gray-50 border border-dashed border-gray-200 p-6 rounded-xl text-center flex flex-col items-center justify-center opacity-70">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-300 mx-auto flex items-center justify-center mb-4">
                <Trophy size={32} />
              </div>
              <h3 className="font-bold text-gray-400 mb-1">Master Gardener</h3>
              <p className="text-sm text-gray-400">Unlock at Level 10</p>
           </div>
        </div>
      </div>
    </div>
  );
}