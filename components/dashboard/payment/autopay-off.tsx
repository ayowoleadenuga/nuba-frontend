import { ArrowDownIcon } from "@/assets/svg/arrow-dropdown-icon";
import { ArrowRightIcon } from "@/assets/svg/arrow-right-icon";
import { CheckedIcon } from "@/assets/svg/ckecked-icon";
import { Mastercard } from "@/assets/svg/mastercard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import React from "react";

interface AutoPayOffProps {
  setMakePayment: React.Dispatch<
    React.SetStateAction<"" | "start" | "complete">
  >;
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}
const AutopayOff: React.FC<AutoPayOffProps> = ({ setMakePayment, setTab }) => {
  return (
    <div className=" rounded-[4px] ">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-2">
          <div>
            <div className="flex items-center gap-1">
              <CheckedIcon fill="#999B9E" />
              <p className="text-[12px] font-[500] ">Autopay off</p>
            </div>
            <p className="text-[12px] text-[#999B9E] mt-1 ">
              Your payment of 1,223.88 is processing today
            </p>
          </div>
          <button onClick={() => setTab("autopay-setup")}>
            <ArrowRightIcon />
          </button>
        </div>
        <div className="flex items-center justify-between pt-6 pb-4">
          <div className="flex items-center gap-1">
            <CheckedIcon fill="#999B9E" />
            <p className="text-[12px]  ">Include Points in Payment</p>
          </div>
          <button onClick={() => setTab("include-points")}>
            <ArrowRightIcon />
          </button>
        </div>

        <Accordion type="single" collapsible className=" ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center gap-2">
              <p className="font-[600] text-[12px] ">Payment Method</p>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <Mastercard />
                  <div>
                    <p className="font-[500] text-[14px] ">
                      Mastercard ending in 8480
                    </p>
                    <p className="font-[300] text-[12px] ">Expiry 04/2026</p>
                  </div>
                </div>
                <span className="bg-[#27AE60] border-[#474747] border rounded-full w-4 h-4 "></span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-2 bg-white p-4">
        <div className="flex items-center justify-between text-[#999B9E] ">
          <p className="font-[600] text-[12px] ">Total balance</p>
          <p className="text-[10px]">£1,223.88</p>
        </div>
        <Button
          onClick={() => setMakePayment("start")}
          className=" flex items-center justify-center w-full mt-2 "
        >
          Make Payment
        </Button>
      </div>
    </div>
  );
};

export default AutopayOff;
