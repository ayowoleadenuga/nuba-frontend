import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { Redeem } from "@/assets/svg/redeem";
import React, { ReactNode } from "react";

interface CardProps {
  earned?: string;
  point?: string;
  title: string;
  description: string;
  action: string;
  Icon: React.ElementType;
  handleClick?: () => void;
}
const EarnedCard: React.FC<CardProps> = ({
  earned,
  point,
  title,
  description,
  action,
  Icon,
  handleClick,
}) => {
  return (
    <div className="p-6 border-border border w-[27%] rounded-[6px] min-h-[223px] relative ">
      <div className="absolute top-[25%] left-0  ">
        <Icon />
      </div>
      <div className="pl-5">
        {earned && earned?.length > 1 && (
          <div>
            <p className="text-grayText font-[500] ">{earned}</p>
            <p className="text-[20px] font-[500] ">{point} points</p>
          </div>
        )}
        <p className="text-grayText font-[500]">{title}</p>
        <p className="text-[#0B2233] text-[12px] ">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-4 border-t border-t-black pt-4 absolute bottom-4 w-[calc(100%-48px)] ">
        <p>{action}</p>
        <button>
          <ArrowRightIcon />{" "}
        </button>
      </div>
    </div>
  );
};

export default EarnedCard;
