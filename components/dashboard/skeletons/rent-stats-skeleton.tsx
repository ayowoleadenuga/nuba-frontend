"use client";

const RentStatsSkeleton = () => {
  return (
    <div className="flex items-center gap-2 flex-wrap mt-5">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="border border-[#D9D9D9]] rounded-[8px] p-2 md:p-3 w-[100px] md:w-[120px]"
        >
          <div className="h-[14px] bg-gray-300 rounded w-2/3 mb-2 animate-pulse" />
          <div className="h-[32px] bg-gray-300 rounded w-full mb-1 animate-pulse" />
          <div className="h-[14px] bg-gray-300 rounded w-1/2 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default RentStatsSkeleton;
