"use client";
import React, { useState } from "react";

interface GradientProgressBarProps {
  percentage: number | undefined;
}

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({
  percentage,
}) => {
  const [showPercent, setShowPercent] = useState<boolean>(false);
  return (
    <div className="w-full max-w-md mx-auto mt-10 relative">
      <div className="flex justify-between text-sm font-medium  px-1 relative">
        <span className="flex flex-col items-center justify-center">
          0%
          <span className="bg-black w-1 h-2 rounded-t-[4px]  "></span>
        </span>
        <span className="flex flex-col items-center justify-center">
          30%
          <span className="bg-black w-1 h-2 rounded-t-[4px]  "></span>
        </span>
        <span className="flex flex-col items-center justify-center">
          60%
          <span className="bg-black w-1 h-2 rounded-t-[4px]  "></span>
        </span>
        <span className="flex flex-col items-center justify-center">
          100%
          <span className="bg-black w-1 h-2 rounded-t-[4px]  "></span>
        </span>
      </div>
      <div
        onMouseEnter={() => setShowPercent(true)}
        onMouseLeave={() => setShowPercent(false)}
        className="cursor-pointer relative h-2 rounded-full bg-white overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(to right, #1e3a5f, #ffffff)",
          }}
        />
      </div>
      {showPercent && (
        <div className="bg-gray-300 rounded-[8px] px-3 py-1 absolute bottom-10 left-0 ">
          <p className="text-[10px] ">{percentage}%</p>
        </div>
      )}
    </div>
  );
};

export default GradientProgressBar;
