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
    question: "What are the benefits of paying with Nuba",
    answer: `Paying rent with Nuba comes with several benefits: Earn Rewards – Turn your biggest monthly expense into an opportunity to earn points with your card provider. More Flexibility – Enjoy the freedom and convenience of paying rent with your card, giving you greater financial control. Build Credit Faster – Strengthen your financial profile by using your card for rent payments, helping you boost your credit score. Seamless Convenience – Nuba makes rent payments quick, secure, and hassle-free, so you can pay in seconds with ease`,

    expand: true,
  },

  {
    question: "Can payments be made with AMEX?",
    answer: `Yes, Nuba supports American Express (AMEX) payments, providing you with the flexibility to use your preferred payment method for added convenience and ease of transactions. Pay securely and conveniently with AMEX through Nuba`,

    expand: false,
  },

  {
    question: "Can the rewards earned on my card outweigh the Nuba fee?",
    answer: `Businesses=> The Nuba fee for a business may be offset as an expense on your business’s end of year taxes. This means the Nuba fee is 100% tax deductible making paying your rent using Nuba an even more rewarding tool for your business. The exact benefit will depend on your business’s tax position. Please check with your tax advisor to see how this applies to you. \nAdd commentMore actions
Individuals=> Users can benefit from Nuba if your card offers rewards, points, or cash back. With flexible payment methods Nuba users can better manage cashflow reducing the risk of late fees and rent arrears by having the added convenience and flexibility by paying by card on the Nuba platform. It is important to note that Nuba’s benefits can vary card by card`,

    expand: false,
  },

  {
    question: "Is Nuba safe and secure?",
    answer: `At Nuba, safeguarding you and your finances is fundamental to our services. We employ rigorous measures to ensure the utmost safety of your card details, personal information, and transaction history. Our dedicated in-house security and compliance team works tirelessly to guarantee the security of all your transactions.Add commentMore actions
Nuba employs industry-standard 3D-Secure protection, our proprietary anti-fraud protocols, and cutting-edge card verification technology, ensuring your safety and peace of mind at every step`,

    expand: false,
  },

  {
    question: "Do I need to inform my agent that I will be paying via Nuba?",
    answer: `In regards to your agent, there’s no need to inform them as long as your payment reference is inputted correctly on the Nuba platform. The payment will be sent out by Payr using that same reference and once received by your agent, they will simply look out for the payment reference on the incoming payment so it will be marked as paid on their side!`,

    expand: false,
  },
];
