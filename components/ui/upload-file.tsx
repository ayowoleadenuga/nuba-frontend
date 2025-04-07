"use client";
import React from "react";
import { IconDelete } from "@/assets/svg/icon-delete";
import UploadIcon from "@/assets/svg/upload-icon";
import { cn } from "@/utils";

interface UploadFileProps {
  description: string;
  className?: string[];
  containerClass?: string[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFile: () => void;
  selectedFile?: File | null;
  name: string;
}
const UploadFile: React.FC<UploadFileProps> = ({
  description,
  className,
  containerClass,
  handleFileChange,
  handleClearFile,
  selectedFile,
  name,
}) => {
  return (
    <div className={cn(className)}>
      <label>
        <input
          id={`FileInput-${name}`}
          type="file"
          className="hidden"
          name={name}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <div
          onClick={e => {
            e.preventDefault();
            const fileInput = document.getElementById(
              `FileInput-${name}`
            ) as HTMLInputElement;
            fileInput?.click();
          }}
          className={cn(
            " mt-10 cursor-pointer w-full py-10 text-[12px] border-[2px] border-dashed border-black",
            containerClass
          )}
        >
          {!selectedFile && (
            <div className="flex items-center justify-center gap-2 ">
              <UploadIcon />
              <p className="font-[700]">{description}</p>
            </div>
          )}
          {selectedFile && (
            <div className="mt-4 text-center flex items-center justify-center gap-2 w-full">
              <div>
                {selectedFile?.type?.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-[100px] h-[100px] object-cover mx-auto rounded-md"
                  />
                ) : (
                  <p className="text-[12px] font-[500]">{selectedFile?.name}</p>
                )}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleClearFile();
                }}
              >
                <IconDelete fill="red" />
              </button>
            </div>
          )}
        </div>
      </label>
      <p className="text-[10px] font-[500] mt-1 ">
        Attach file. File size of your documents should not exceed 10MB
      </p>
    </div>
  );
};

export default UploadFile;
