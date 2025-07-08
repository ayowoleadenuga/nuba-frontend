"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

export default function FAQ() {
  return (
    <section className="w-full max-w-full mx-auto px-6 md:px-10 py-12">

      <Accordion
        type="single"
        collapsible
        className="w-full text-white space-y-2"
      >
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              "bg-[rgba(23,27,32,0.53)] border-none rounded-[10px] px-6",
              index !== 0 && "mt-2"
            )}
          >
            <AccordionTrigger
              className={cn(
                "text-base md:text-lg font-medium flex justify-between items-center w-full py-4 group",
                "hover:no-underline [&>svg]:hidden"
              )}
            >
              <span className="text-left text-white">{item.question}</span>
              <span className="text-xl text-white opacity-70 font-bold">
                <span className="group-data-[state=open]:hidden">
                  <FaPlus className="text-md" />
                </span>
                <span className="hidden group-data-[state=open]:inline">
                  <FaMinus className="text-md" />
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-white/70 leading-relaxed pb-4 whitespace-pre-line">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

const faqItems = [
  {
    question: "Why pay rent with Nuba?",
    answer: `Because rent day doesn’t have to be pain day. Here’s how Nuba puts you back in control:

● Earn rewards  
Use your card to pay rent and earn points. When friends pay rent using your referral link, you earn even more — including repeated 100% discounts. Yes, rent-free living is possible.

● More flexibility  
Tight month? Pay rent using your credit card, then repay it later. More breathing room, less stress.

● Boost your credit  
Enroll in Credit Boost to report your on-time rent payments to the three major credit bureaus. Steady payments = stronger credit.

● Rent Day surprises  
On the 1st of each month, enjoy exclusive rewards, special offers, and even a shot at free rent.

● Nuba Points  
Refer others, earn points, and unlock discounts. Earn enough and you could live rent-free for months — even the whole year.`,
  },
  {
    question: "Does Nuba support American Express (AMEX)?",
    answer:
      "Yes. You can use your American Express card to pay rent through Nuba. Enjoy flexibility, rewards, and secure transactions with your preferred card.",
  },
{
  question: "Can I earn more in rewards than I pay in fees?",
  answer: `● For businesses:  
Yes. The Nuba fee may be fully tax-deductible as a business expense, potentially lowering your end-of-year tax bill. Using Nuba to pay rent can be both rewarding and financially efficient. Consult your tax advisor for personalized guidance.

● For individuals:  
Absolutely — especially if your card offers cashback, points, or travel rewards. Combine that with Nuba referrals and Rent Day perks, and you could earn far more than the fees you pay. In fact, if you consistently accumulate enough Nuba Points, you could unlock multiple months of free rent.

Note: Actual results depend on your card type, spending, and how actively you refer others.`,
},
  {
    question: "Is Nuba secure?",
    answer:
      "Very. We partner with FCA-regulated, PCI-compliant providers and use bank-level encryption, 3D Secure, and in-house security teams to protect your data and transactions at all times.",
  },
  {
    question: "Do I need to tell my landlord or agent I'm using Nuba?",
    answer:
      "No need. Just include your correct rent reference when setting up your payment. Your landlord or agent will receive the rent as usual and match it to your account without any extra steps.",
  },
]
