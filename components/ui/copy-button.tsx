"use client";
import { CopyIcon } from "@/assets/svg/copy-icon";
import { handleCopy } from "@/utils";
import React, { useCallback, useState } from "react";

interface CopyButtonProps {
  name: string;
  value: string;
}
const CopyButton: React.FC<CopyButtonProps> = ({ name, value }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyText = useCallback(() => {
    handleCopy(value, setCopied);
  }, [value]);
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <p className="text-[#9da7ad] font-[600] text-[12px] ">{name}</p>
        {copied && (
          <span className=" text-green-600 text-[10px] ">Copied!</span>
        )}
      </div>
      <button
        onClick={handleCopyText}
        className="bg-black text-white px-6 py-3 text-[12px] rounded-[4px] mt-2 flex items-center gap-2 "
      >
        {value}
        <CopyIcon />
      </button>
    </div>
  );
};

export default CopyButton;
