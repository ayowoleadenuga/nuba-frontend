import MinusIcon from "@/assets/svg/minus-icon";
import PlusIcon from "@/assets/svg/plus-icon";
import React from "react";

interface FaqQuestion {
  question: string;
  answer: string;
  expand: boolean;
}

interface SupportFaqsContainerProps {
  faqQuestions: FaqQuestion[];
  setFaqQuestions: React.Dispatch<React.SetStateAction<FaqQuestion[]>>;
}

const SupportFaqsContainer: React.FC<SupportFaqsContainerProps> = ({
  faqQuestions,
  setFaqQuestions,
}) => {
  return (
    <>
      {" "}
      {faqQuestions.map((faq, index) => {
        return (
          <div
            onClick={() => {
              setFaqQuestions((prev) =>
                prev.map((item, i) => ({
                  ...item,
                  expand: i === index ? !item.expand : false,
                }))
              );
            }}
            className="cursor-pointer border-b border-b-[#D9D9D9]"
            key={index}
          >
            <div className="my-4 flex justify-between items-start w-full">
              <h3 className="text-[14px] font-[600] text-[#1B1E21] w-[80%]">
                {faq.question}
              </h3>
              <div className="bg-black flex items-center justify-center w-5 h-5 rounded-full">
                {faq.expand ? (
                  <MinusIcon width={10} />
                ) : (
                  <PlusIcon width={10} />
                )}
              </div>
            </div>

            {faq.expand && (
              <div>
                {(() => {
                  const lines = faq.answer.trim().split("\n");
                  const content: React.ReactNode[] = [];
                  let tableRows: string[][] = [];

                  lines.forEach((line, idx) => {
                    const trimmed = line.trim();

                    // If it's a table row (contains '|')
                    if (trimmed.includes("|")) {
                      const cells = trimmed
                        .split("|")
                        .map((cell) => cell.trim());
                      tableRows.push(cells);
                    } else {
                      // If we have accumulated tableRows and current line is not a table row
                      if (tableRows.length > 0) {
                        content.push(
                          <table
                            key={`table-${index}-${idx}`}
                            className="w-full mt-2 mb-4 border border-[#D9D9D9] text-[12px] text-[#4B525A]"
                          >
                            <thead>
                              <tr>
                                {tableRows[0].map((cell, i) => (
                                  <th
                                    key={`head-${i}`}
                                    className="border border-[#D9D9D9] px-2 py-1 text-left font-semibold bg-[#f8f8f8]"
                                  >
                                    {cell}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableRows.slice(1).map((row, rowIndex) => (
                                <tr key={`row-${rowIndex}`}>
                                  {row.map((cell, colIndex) => (
                                    <td
                                      key={`cell-${rowIndex}-${colIndex}`}
                                      className="border border-[#D9D9D9] px-2 py-1"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        );
                        tableRows = [];
                      }

                      if (trimmed.includes(":")) {
                        const [key, rest] = trimmed.split(":");
                        const bullets = rest
                          .split(".")
                          .filter((item) => item.trim() !== "");

                        content.push(
                          <div key={`bullets-${index}-${idx}`} className="mb-2">
                            <p className="text-[#4B525A] text-[12px] font-medium">
                              {key.trim()}:
                            </p>
                            <ul className="list-disc pl-5">
                              {bullets.map((b, i) => (
                                <li
                                  key={i}
                                  className="text-[#4B525A] text-[12px]"
                                >
                                  {b.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      } else {
                        content.push(
                          <p
                            key={`para-${index}-${idx}`}
                            className="text-[#4B525A] text-[12px] mb-2"
                          >
                            {trimmed}
                          </p>
                        );
                      }
                    }
                  });

                  if (tableRows.length > 0) {
                    content.push(
                      <table
                        key={`table-end-${index}`}
                        className="w-full mt-2 mb-4 border border-[#D9D9D9] text-[12px] text-[#4B525A]"
                      >
                        <thead>
                          <tr>
                            {tableRows[0].map((cell, i) => (
                              <th
                                key={`head-end-${i}`}
                                className="border border-[#D9D9D9] px-2 py-1 text-left font-semibold bg-[#f8f8f8]"
                              >
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.slice(1).map((row, rowIndex) => (
                            <tr key={`row-end-${rowIndex}`}>
                              {row.map((cell, colIndex) => (
                                <td
                                  key={`cell-end-${rowIndex}-${colIndex}`}
                                  className="border border-[#D9D9D9] px-2 py-1"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  }

                  return content;
                })()}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default SupportFaqsContainer;
