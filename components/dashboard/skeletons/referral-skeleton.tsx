import React from "react";

const ReferralSkeleton = () => {
  return (
    <div className="mt-4 space-y-2">
      <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md" />
      <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md" />
    </div>
  );
};

export default ReferralSkeleton;
