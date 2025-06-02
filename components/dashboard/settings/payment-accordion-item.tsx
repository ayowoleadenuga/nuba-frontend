import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Mastercard } from "@/assets/svg/mastercard";
import ammex from "@/assets/svg/amex-card.svg";
import { PaymentMethod } from "@/types";

interface PaymentAccordionItemProps {
  method: PaymentMethod;
  index: number;
}

const PaymentAccordionItem: React.FC<PaymentAccordionItemProps> = ({
  method,
  index,
}) => {
  return (
    <AccordionItem value={`item-${index}`} key={method.id}>
      <AccordionTrigger className="flex items-center justify-between gap-2 relative bg-[#F1F1F1] px-3">
        <p className="font-[500] text-[14px] ">{method.cardName}</p>
        <div className="absolute right-8 top-4 flex items-center gap-2">
          <Image src={ammex} alt="card" />
          <p>{method.lastDigits}</p>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Mastercard />
            <div>
              <p className="font-[500] text-[14px] ">
                {method.cardName} ending in {method.lastDigits}
              </p>
              <p className="font-[300] text-[12px] ">Expiry {method.mmYY}</p>
              <p className="text-[12px] text-[#666]">
                {method.address} {method.city}, {method.state} {method.postcode}
              </p>
            </div>
          </div>
          <span className="bg-[#27AE60] border-[#474747] border rounded-full w-4 h-4 "></span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PaymentAccordionItem;
