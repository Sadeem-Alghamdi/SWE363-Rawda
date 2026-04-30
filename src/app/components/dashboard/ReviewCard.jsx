import React from "react";

const ReviewCard = ({ review }) => {
  const { title, status, submittedAt, type } = review || {};

  return (
    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <span className="text-xs text-gray-400">{submittedAt} · {type}</span>
      </div>
      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
        {status}
      </span>
    </div>
  );
};

export default ReviewCard;