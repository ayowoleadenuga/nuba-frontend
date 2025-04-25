import React from "react";

const GradientProgressBar = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-10">
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
      <div className="relative h-2 rounded-full bg-white overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: "30%",
            background: "linear-gradient(to right, #1e3a5f, #ffffff)",
          }}
        />
      </div>
    </div>
  );
};

export default GradientProgressBar;
