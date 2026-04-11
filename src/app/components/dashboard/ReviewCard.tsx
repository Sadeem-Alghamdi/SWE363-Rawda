import { Button } from "../ui/Button";
import { CheckCircle2, Clock } from "lucide-react";

export function ReviewCard({ review }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors shadow-sm flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="bg-orange-50 text-orange-600 p-2.5 rounded-lg">
          <Clock size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors cursor-pointer text-sm">
            {review.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              {review.type}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{review.submittedAt}</span>
          </div>
        </div>
      </div>
      <Button variant="outline" size="sm" className="text-xs px-3 h-8 border-gray-200 text-gray-600 hover:text-green-700 hover:border-green-200 hover:bg-green-50">
        Review
      </Button>
    </div>
  );
}
