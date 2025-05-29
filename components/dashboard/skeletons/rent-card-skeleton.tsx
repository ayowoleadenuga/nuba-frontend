"use client";

const RentCardSkeleton = () => {
  return (
    <div className="bg-[#2A4152] py-7 px-10 text-white rounded-[8px] w-full md:w-[80%] lg:w-[50%] xl:w-[40%] mt-5 animate-pulse">
      <div className="h-4 bg-gray-500 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-gray-500 rounded w-1/2 mb-6"></div>
      <div className="h-3 bg-gray-500 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-500 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-500 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-500 rounded w-3/4 mb-4"></div>
      <div className="h-9 bg-gray-500 rounded w-1/3"></div>
    </div>
  );
};

export default RentCardSkeleton;
