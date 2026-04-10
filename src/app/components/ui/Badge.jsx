import { cn } from "../../../lib/utils";
import { LucideIcon, Leaf, TreeDeciduous, Sprout, CheckCircle2 } from "lucide-react";

export type BadgeLevel = "Beginner" | "Senior" | "Master";

const levelConfig: Record<BadgeLevel, { icon: LucideIcon; color: string; bg: string; label: string }> = {
  Beginner: { icon: Sprout, color: "text-green-600", bg: "bg-green-100", label: "Beginner" },
  Senior: { icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-100", label: "Senior" },
  Master: { icon: TreeDeciduous, color: "text-teal-700", bg: "bg-teal-100", label: "Master" },
};

export function LevelBadge({ level, className }: { level: BadgeLevel; className?: string }) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-transparent transition-colors", config.bg, config.color, className)}>
      <Icon size={14} />
      <span>{config.label}</span>
    </div>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]", className)}>
      <CheckCircle2 size={14} className="fill-[#4CAF50] text-white" />
      <span>Verified Expert</span>
    </div>
  );
}

export function TagBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-default", className)}>
      {label}
    </span>
  );
}