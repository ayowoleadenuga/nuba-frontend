"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

export default function TermsModal({ open, onClose }) {
  return (
    <Dialog open={open}  onOpenChange={onClose}>
      <DialogContent  className="xl:max-w-5xl h-[100vh]  overflow-auto lg:max-w-3xl max-h-[90vh] p-0 rounded-2xl">
        <div className="relative bg-white dark:bg-gray-900 flex flex-col h-full">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Nuba Terms and Conditions
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Last updated: 9/7/25
            </DialogDescription>
          </DialogHeader>

            <DialogClose className="hidden"></DialogClose>
            <button type="button" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-[5rem]">
              <X className="h-5 w-5 dark:text-white" />
            </button>
          <ScrollArea className="flex-1 p-6 space-y-4 text-gray-700 dark:text-gray-300 overflow-x-auto">

            <h3 className="font-semibold text-lg">1. Introduction</h3>
            <p>These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you" or "your") and Nuba ("Nuba", "we", "us" or "our") in relation to your access to and use of the Nuba website and any associated services. By registering for and/or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, you must refrain from using our services.</p>

            <h3 className="font-semibold mt-4 text-lg">2. About Us</h3>
            <p>Nuba is a trading name of Nuba Technologies LTD, a company registered in England and Wales with company number 16344130 and registered address at 3 Breeze 4 Owls Road, Bournemouth, BH51FE.  Nuba enables individuals to pay their rent using a debit or credit card and earn rewards on their cards and rent discounts.
            Nuba provides technology-enabled services to facilitate the payment of rent using credit and debit cards. We are not authorised or regulated by the Financial Conduct Authority to provide payment services. To enable such functionality, we collaborate with regulated third-party service providers, including Ryft (an FCA-authorised payment institution) and (an FCA-authorised electronic money institution). 
            From time to time, we might need to change the companies who we work with to provide services to you. Where we do this, we will make you aware of this by updating these Terms and our Privacy Policy. If any such change has a material impact on how we provide the service to you or to these Terms, we will notify you in advance and you should contact us if you have any concerns or questions.
            </p>

            <h3 className="font-semibold mt-4 text-lg">3. Scope of Services</h3>
            <p>
                a) Nuba provides Users with access to the following services:
                <li>
                    	Facilitation of rent payments via debit and credit card;
                </li>
                <li>
                    Access to a referral-based rewards program;
                </li>
                <li>
                    Application of accumulated reward points as partial or full rent discounts subject to applicable terms.
                </li>
                b)  All payment processing and settlement activities are undertaken through our duly appointed regulated partners. <br/>
                c) These Terms cover your use of the Nuba platform and any rent payments made to your landlord or their agent through our services. Our Privacy and Cookie Policies explain how we handle your personal information and track website activity.
                <br/>
                d) If you interact with third-party services through our platform—such as payment processors or identity verification providers—you’ll also be subject to their own terms and privacy policies. We’re not responsible for the content or performance of any external sites you access, and it’s your responsibility to review and comply with any applicable terms or charges they impose.
            </p>

            <h3 className="font-semibold mt-4 text-lg">4. Account Registration and Verification</h3>
            <p>To access our services, Users must:
                <li>Create a verified account on the Nuba platform;</li>
                <li>Provide accurate, complete and up-to-date personal information;</li>
                <li>Maintain confidentiality and security of login credentials;</li>
                <li>Promptly notify us of any changes to account or identity information.</li>
                We reserve the right to request additional documentation to satisfy our own or our partners’ legal and regulatory obligations. Failure to comply may result in suspension or termination of access.
                We may request additional information or documents from you at any time to meet our compliance obligations—this may include evidence of your source of funds or wealth. If the required information is not provided or verified, we may suspend your access to our services until our checks are complete.
                You confirm that all details you provide to us are accurate, complete, and current, and that you are authorised to share them. You agree to promptly update your information if anything changes.
                You must not use your account for any unlawful activities or for business or commercial purposes. This includes, but is not limited to, activities related to fraud, money laundering, or breaches of consumer protection laws.
                You are fully responsible for all use of your account. If your actions breach these Terms, you agree to compensate us for any resulting losses, penalties, or expenses.
            </p>


            <h3 className="font-semibold mt-4 text-lg">Using Our Services</h3>
            <p>Upon successful verification, you may access your Nuba account to make rent payments directly to your landlord or their authorised agent. The service must not be used for any other type of payment.
            Each time you initiate a transaction, you are responsible for:
            <li>Ensuring that your payment card details are current and valid;</li>
            <li>Verifying that the payment details of your landlord or agent are accurate and up to date;</li>
            <li>Authorising us to collect the full payment amount, including any applicable service fee, from your designated payment method.</li>
            Payments are processed based on the instructions you provide. Once executed, a payment is considered final—even if you entered incorrect information. While we may attempt to recover misdirected funds, recovery is not guaranteed and may be subject to an administrative fee.
            You may only use the service to make payments on your own behalf. Use on behalf of third parties is strictly prohibited.

            We may suspend or cancel a payment if the recipient details do not match your verified records or if we reasonably believe the payment is unauthorised or unlawful.
            We reserve the right to refuse a payment instruction under the following circumstances:
            <li>
                We suspect fraud or illegal activity;
            </li>
            <li>
                The instruction is unclear, incorrect, or incomplete;
            </li>
            <li>
                You are in breach of these Terms;
            </li>
            <li>
                Required security or authentication steps are not completed;
            </li>
            <li>
                Insufficient authorised funds are available, including for our service fee;
            </li>
            <li>
                The payment exceeds set limits;
            </li>
            <li>
                Fulfilling the request would breach legal or regulatory obligations;
            </li>
            <li>
                Technical or operational issues prevent completion;
            </li>
            <li>
                The transaction does not appear to relate to rent payments.
            </li>
            If we refuse a payment, we will inform you as soon as reasonably possible unless prohibited by law. Where appropriate, we will provide the reason for the refusal and guidance on correcting any errors.
            </p>

            <h3 className="font-semibold mt-4 text-lg">5. Payment Terms</h3>
            <h4>Payment Timing and Processing</h4>
            <p>You acknowledge and agree that Nuba has no control over the timing or processing delays that may be imposed by your card issuer, payment provider, or your landlord’s (or their agent’s) financial institution. Accordingly, we cannot guarantee when payments will be received by the intended recipient.
            It is your responsibility to initiate payments sufficiently in advance to ensure they are received by your landlord or agent on time. Nuba will not be liable for any late payment consequences resulting from your failure to do so.
            While we may provide optional payment reminder features through your account, these are for convenience only. You remain solely responsible for ensuring that rent payments are made on time.
            If we are unable to execute your payment due to delays in receiving funds, insufficient balance, or regulatory and compliance requirements, we will not be held liable for such delays. Where permitted, we will notify you of the reason for any delay or rejection of your payment instruction.
            Please note that there may be a processing interval between when we receive your funds and when the payment is released to the landlord or their agent. This delay is necessary to complete operational and regulatory verifications.
            All rent funds received from you that are intended for landlords or agents are held in a segregated client account solely for that purpose. Our service fees are collected and maintained separately in a different account.
            We reserve the right to decline or halt any payment we reasonably suspect to be fraudulent, unauthorised, or unlawful.
            </p>

            <h3 className="font-semibold mt-4 text-lg">6. Rewards & Points</h3>
            <p>
                <li>
                You earn Nuba Points through referrals and eligible transactions.
                </li>
                <li>
                    Points are redeemable as rent discounts at defined milestones: 30%, 60%, or 100% of your rent.
                </li>
                <li>
                    100 Nuba Points = £1 in rent discount.
                </li>
                <li>
                    Points reset to zero after each redemption.
                </li>
                <li>
                    Points cannot be exchanged for cash.
                </li>
                Our service fees are clearly outlined on the Nuba website and are applicable to each rent payment processed through our platform. These fees are charged in the currency relevant to your transaction and are added on top of the rent amount you intend to pay your landlord or their appointed agent.
                By using our services, you acknowledge and agree that:
                <li>
                    Our fee is payable with each transaction and is in addition to any fees that may be charged by your card issuer or bank.
                </li>
                <li>
                    You remain solely responsible for covering all applicable charges relating to your rent payment.
                </li>
                <li>
                    We may revise our service fees by providing you with no less than 30 business days’ notice. If you do not accept the revised fees, you may discontinue use of the services and request account closure before the new fees take effect.
                </li>
                <li>
                    Continued use of the services following such notice will be deemed acceptance of the updated fee structure.
                </li>
                By choosing to use Nuba, you acknowledge that you are voluntarily selecting our platform as your method of rent payment. Alternative, fee-free payment methods may be available to you. You accept any applicable Nuba service fees, which are transparently displayed before payment is confirmed.
            </p>

            <h3 className="font-semibold mt-4 text-lg">Refunds and Payment Finality</h3>
            <p>Payments made via Nuba are processed immediately and, once sent to your landlord (or their agent), are considered final and non-refundable. You may not schedule future-dated payments.
            If you believe a refund is due, you must resolve this directly with your landlord or their agent. Should they choose to return funds to us instead of to you, we will forward the full amount received back to your original payment method. Our service fee is separate from your rent payment and is non-refundable unless we are found to be in breach of these Terms.

            </p>

            <h3 className="font-semibold mt-4 text-lg">Relationship with Your Landlord or Agent</h3>
            <p>Your use of Nuba does not alter, affect, or create any rights or obligations under the legal arrangement between you and your landlord or their authorised agent. Nuba acts solely as a payment facilitator and is not a party to your tenancy agreement.
            You acknowledge and agree that:
            <li>
                Nuba has no formal contractual relationship or affiliation with your landlord or their agent unless     explicitly stated.
            </li>
            <li>
                The agreement to use Nuba’s services exists exclusively between you and Nuba. It does not extend any rights or duties to the landlord or agent, nor does it impose any obligations on them.
            </li>
            <li>
                Your landlord or agent is not responsible for our service fees and has no control over our pricing or service terms.
            </li>
            <li>
                Any platform service fees charged by Nuba are part of a separate commercial arrangement between you and Nuba and are unrelated to your rent or tenancy agreement.
            </li>
            We will not mediate or involve ourselves in any disputes between you and your landlord or agent, including those relating to rent amounts, payment obligations, tenancy issues, or refunds.
            If your landlord or their agent also uses Nuba’s platform to receive rent payments, this shall not alter the enforceability of the terms stated in this section.
            </p>

            <h3 className="font-semibold mt-4 text-lg">Suspension and Termination of Services</h3>
            <p>We reserve the right to suspend, limit, or permanently withdraw access to our services, including the ability to process payments, without prior notice or explanation, at our sole discretion.
            We may, without liability, cancel or reject any payment instruction or impose limits on the amount, frequency, or timing of your transactions. We are under no obligation to provide a reason for such actions.
            If you initiate a chargeback with your card issuer for a payment that has already been disbursed to your landlord or their agent:
            <li>
                This will constitute a material breach of these Terms;
            </li>
            <li>
                You will be required to immediately repay the full amount of the disputed transaction to Nuba;
            </li>
            <li>
                We reserve the right to terminate your access to our services and close your account.
            </li>
            <li>
                We may also suspend or withdraw the provision of services in the following circumstances:
            </li>
            <li>
                Where there are concerns regarding the security of your account or where we suspect that your credentials have been compromised or misused in any unauthorised, unlawful, or fraudulent manner;
            </li>
            <li>
                Where you are found to be in material breach of these Terms;
            </li>
            <li>
                To address technical faults or carry out system maintenance;
            </li>
            <li>
                To implement service updates required by law, regulation, or regulatory guidance (including that of our third-party providers such as Modulr or Ryft);
            </li>
            <li>
                Where you fail to provide required documentation or information necessary for regulatory or compliance purposes, or where the information provided is, in our reasonable view, inaccurate or incomplete.Where possible, we will provide prior notice of any suspension. However, in cases of emergency, security concerns, or where prohibited by law or regulation, such notice may not be provided.
            </li>
            </p>

            <h3 className="font-semibold mt-4 text-lg">7. Refunds and Chargebacks</h3>
            <p>
            <li>
            Payments made to landlords are non-refundable by Nuba.
            </li>
            <li>
                Refunds must be arranged directly with the landlord or managing agent.
            </li>
            <li>
                if a chargeback is initiated, you will owe Nuba the full rent amount if we have already paid the landlord.
            </li>
            </p>

            <h3 className="font-semibold mt-4 text-lg">8. Use Restrictions</h3>
            <p>You must not:
                <li>
                    Use Nuba for illegal or commercial purposes;
                </li>
                <li>
                    Attempt to reverse engineer or replicate the platform;
                </li>
                <li>
                    Use another person's card or account;
                </li>
                <li>
                    Misuse referral programs or create fake accounts.
                </li>
            </p>

            <h3 className="font-semibold mt-4 text-lg">9. Limitation of Liability</h3>
            <p>Nuba is not liable for:
                <li>
                    Landlord disputes or tenancy matters;
                </li>
                <li>
                   Payment delays caused by third-party providers;
                </li>
                <li>
                    Loss of rewards due to account misuse or system error;
                </li>
                <li>
                    Indirect or consequential damages.
                </li>
            </p>

            <h3 className="font-semibold mt-4 text-lg">10. Changes to Terms</h3>
            <p>We may amend these Terms at any time. You will be notified of material changes at least 30 days in advance. Continued use of Nuba services after changes indicates your acceptance.</p>

            <h3 className="font-semibold mt-4 text-lg">11. Contact Us</h3>
            <p>For support or questions, contact: support@nubarewards.com
            These Terms are governed by the laws of England and Wales.
            </p>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
