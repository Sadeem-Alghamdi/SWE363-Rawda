import { cn } from "../../../lib/utils";

export function Button({ className, variant = "primary", size = "md", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        {
          "bg-[#4CAF50] text-white hover:bg-[#43A047] shadow-sm": variant === "primary",
          "bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9]": variant === "secondary",
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-50 text-gray-900": variant === "outline",
          "hover:bg-gray-100 text-gray-700": variant === "ghost",
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-4 py-2": size === "md",
          "h-12 px-6 py-3 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}


