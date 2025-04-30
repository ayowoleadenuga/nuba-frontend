import React from "react";
import { array } from "zod";

const TopReferrersTable = () => {
  return (
    <div className="w-[43%] border rounded-[8px] border-[#D9D9D9]  h-[345px]  bg-[#f7f9fc] p-3  ">
      <p className="text-grayText font-[500] text-[12px] mb-4 ">
        Top Referrers
      </p>
      <div className="overflow-y-auto h-[295px] ">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-b-border flex items-center justify-between py-2"
          >
            <p className="font-[500] text-[12px]">John Doe</p>
            <p className="font-[500] text-[10px] text-[#8D8D8D]">
              4,000 Referrals
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopReferrersTable;
