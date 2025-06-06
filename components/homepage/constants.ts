import BenefitsIcon from "@/assets/svg/benefits-icon";
import HomeIcon from "@/assets/svg/home-icon";
import RewardsIcon from "@/assets/svg/rewards-icon";
export const revolutioniseList = [
  {
    type: "Benefit",
    price: "£300",
    button: "Explore benefits",
    icon: BenefitsIcon,
    height: "350px",
    bgUrl: "/assets/benefits-bg.jpg",
    color: "#88BB6C",
  },
  {
    type: "Rent",
    price: "£1500",
    button: "Manage Payments",
    icon: HomeIcon,
    height: "370px",
    bgUrl: "/assets/managePaymentsBg.jpg",
    color: "#6927DA",
  },
  {
    type: "Rewards",
    price: "£100",
    button: "Explore rewards",
    icon: RewardsIcon,
    height: "350px",
    bgUrl: "/assets/rewards-bg.jpg",
    color: "#528BFF",
  },
];

export const faqs = [
  {
    question: "What Are Nuba Points?",
    answer: `Nuba Points are rewards you earn when someone you refer completes their first rent payment via Nuba. These points convert directly into rent discounts: 100 Nuba Points = £1 rent discount. Redeem at milestone levels - 30%, 60%, or 100% of your rent. Points have no expiration date until redeemed. After redemption, your points reset to zero
    `,
    expand: true,
  },
  {
    question: "How Do I Earn Nuba Points?",
    answer: `You earn points by referring people to use Nuba for their rent payments. When a referred person completes their first rent payment, you receive 399 Nuba Points for every £1,000 of that payment. Only one referral bonus is awarded per referred user, based on their first payment. \n Example: Refer a friend who completes their first £1,000 rent payment. You earn 399 points (£3•99 discount). No additional points are earned for subsequent payments by the same referral

`,
    expand: false,
  },
  {
    question: "What If My Referral’s Rent Is Not £1,000?",
    answer: `The points you earn are proportional to the referral’s first rent payment. You receive 0.399 points per £1 of their first payment. \n Examples: If their first payment is £500, you earn 199•5 points (rounded to 200, worth £2). If their first payment is £1,500, you earn 598•5 points (rounded to 599, worth £5•99). Only the first payment counts, regardless of the amount.
`,
    expand: false,
  },
  {
    question: "How Can I Track My Nuba Points?",
    answer: `You can view your points balance and referral activity directly in the Nuba app. Navigate to the “Nuba Points” section to see your current points, referral history, and progress toward milestones. Updates are reflected after each referral’s first rent payment is processed.`,
    expand: false,
  },
  {
    question: "What Are the Milestone Levels?",
    answer: `Milestones are based on a percentage of your monthly rent. You can redeem points when you reach one of these levels.\n
Milestone | Discount | Points Needed
30% | £300 | 30,000
60% | £600 | 60,000
100% | £1,000 | 100,000 \n You can redeem at any milestone or save for a higher one. Points reset to zero after each redemption.`,
    expand: false,
  },

  {
    question: "How Does It Work? An Example",
    answer: `If you refer 10 people, each completing their first £1,000 rent payment: Each referral earns you 399 points. 10 referrals = 3,990 points (£39•90 discount). Refer more people to reach a milestone, like 30,000 points for a £300 discount on a £1,000 rent
`,
    expand: false,
  },

  {
    question: "How Do I Redeem Points?",
    answer: `When you’ve earned enough points for a milestone: Open the Nuba app. Select your milestone (30%, 60%, or 100%). Redeem, and the discount is applied to your next rent payment. Points reset to zero after redemption \nExample: For a £1,000 rent, redeeming 30,000 points gives you a £300 discount, so you pay only £700 that month.
`,
    expand: false,
  },
];
