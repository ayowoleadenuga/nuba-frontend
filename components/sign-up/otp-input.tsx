import React, { useState, useRef, useEffect } from "react";

interface CodeInputProps {
  onCodeChange: (code: string) => void;
  error?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({ onCodeChange, error }) => {
  const [code, setCode] = useState<string>("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (index < inputRefs.current.length - 1 && value !== "") {
      inputRefs.current[index + 1]?.focus();
    }

    setCode(prevCode => {
      const newCode = prevCode.split("");
      newCode[index] = value;

      const joinedCode = newCode.slice(0, 6).join("");
      if (index === 5 && value !== "") {
        onCodeChange(joinedCode);
      }

      return joinedCode;
    });
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = code.split("");
    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < inputRefs.current.length) {
        newCode[index + i] = pastedData[i];
      }
    }
    setCode(newCode.join(""));
    onCodeChange(newCode.join("").slice(0, 6));
  };

  return (
    <div className="flex flex-col space-y-2 ">
      <div className="flex space-x-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            placeholder="-"
            ref={el => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            className="w-12 h-12 border outline-[#CCCCCC] rounded-lg text-center"
            value={code[index] || ""}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => {
              if (e.key === "Backspace" && index > 0) {
                inputRefs.current[index - 1]?.focus();
              }
            }}
            onPaste={e => handlePaste(e, index)}
          />
        ))}
      </div>
      <p className="text-red-500 text-[10px] leading-tight text-start">
        {error}
      </p>
    </div>
  );
};

export default CodeInput;
