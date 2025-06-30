import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { PaymentMethod } from "@/types";
import paymentCard from "@/assets/png/payment-card.png";

interface PaymentAccordionItemProps {
  method: PaymentMethod;
  index: number;
  // isActive: boolean;
  onSelect: () => void;
}

const PaymentAccordionItem: React.FC<PaymentAccordionItemProps> = ({
  method,
  index,
  // isActive,
  onSelect,
}) => {
  return (
    <AccordionItem
      value={`item-${index}`}
      key={method.id}
      className="cursor-pointer"
    >
      <AccordionTrigger className="flex items-center justify-between gap-2 relative bg-[#F1F1F1] px-3">
        <div className="flex gap-2">
          {method.default && (
            <span className="bg-[#27AE60] border-[#474747] border rounded-full w-4 h-4"></span>
          )}
          <p className="font-[500] text-[14px]">{method.cardName}</p>
        </div>
        <div className="absolute right-8 top-4 flex items-center gap-2">
          <Image src={paymentCard} alt="card" className="w-7 h-5 " />
          <p>{method.lastDigits}</p>
        </div>
      </AccordionTrigger>

      <AccordionContent onClick={onSelect}>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Image src={paymentCard} alt="card" className="w-7 h-5 " />
            <div>
              <p className="font-[500] text-[14px]">
                {method.cardName} ending in {method.lastDigits}
              </p>
              <p className="font-[300] text-[12px]">Expiry {method.mmYY}</p>
              <p className="text-[12px] text-[#666]">
                {method.address} {method.city}, {method.state} {method.postcode}
              </p>
            </div>
          </div>
          {method.default && (
            <span className="bg-[#27AE60] border-[#474747] border rounded-full w-4 h-4"></span>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PaymentAccordionItem;
