import React from "react";

const PointsDateJoinSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-4 items-center">
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      <div className="flex flex-col gap-1">
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
        <div className="w-32 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default PointsDateJoinSkeleton;
