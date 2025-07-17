"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

type PrivacyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="xl:max-w-5xl h-[100vh] overflow-auto lg:max-w-3xl max-h-[90vh] p-0 rounded-2xl">
        <div className="relative bg-white dark:bg-gray-900 flex flex-col h-full">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Privacy Policy
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Last updated: 16/7/2025
            </DialogDescription>
          </DialogHeader>

          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-[5rem]"
          >
            <X className="h-5 w-5 dark:text-white" />
          </button>

          <ScrollArea className="flex-1 p-6 space-y-4 text-gray-700 dark:text-gray-300 overflow-x-auto">
            <h3 className="font-semibold text-lg">1. Introduction</h3>
            <p>
                Welcome to <b>Nuba Rewards</b> (“Nuba”, “we”, “us”, or “our”). 
                <br/>
                <span className="block mt-2">
                    We understand that your privacy matters. This policy explains how we collect, use, share, and protect your personal information when you use our rent‑rewards platform or visit nubarewards.com. It also outlines your privacy rights and how to contact us or relevant regulators if you have concerns.
                </span>
            </p>
            <h3 className="font-semibold text-lg  mt-3">2. Data Controller</h3>
            <p>
                Nuba Rewards Ltd. is the data controller of your personal information.
                <li>
                    Address: [Insert Nuba's registered address]
                </li>
                <li>
                    Email (data privacy team): support@nubarewards.com
                </li>
                You can also lodge a complaint with the UK Information Commissioner’s Office (ICO), although we appreciate the opportunity to address your concern directly first.
            </p>
            <h3 className="font-semibold text-lg  mt-3">3. Keeping Your Data Accurate</h3>
            <p>
              Let us know if your information changes so we can keep everything accurate.
            </p>
            <h3 className="font-semibold text-lg  mt-3">4. Policy Updates</h3>
            <p>
              This policy may be updated. Last updated on 16 July 2025.
            </p>
            <h3 className="font-semibold text-lg  mt-3">5. Third‑Party Links</h3>
            <p>
                Our website may include links to external sites or integrations (e.g. payment gateways). We are not responsible for their privacy practices—please review their respective policies.
            </p>
            <h3 className="font-semibold text-lg  mt-3">6. Data We Collect</h3>
            <div>
                    <p className=" mt-3">For Tenants</p>
                    <li>
                        <b>Identity Data</b>:  name, username or similar identifier, marital status, title, date of birth.
                    </li>
                    <li>
                        <b>Contact Data</b>: includes email address and telephone number, address and billing address.
                    </li>
                    <li>
                        <b>Transaction Data</b>: includes details about payments from you.
                    </li>
                    <li>
                        <b>Technical & Usage Data</b>: IP address, browser/device info, activity logs
                    </li>
                    <li>
                        <b>Marketing Preferences</b>: Email opt‑ins/opt‑outs
                    </li>
                    <li><b>Technical Data</b>: includes your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, the device type, operating system, unique device identifiers, device settings, and geo-location data</li>

                    <p className=" mt-3">
                        Representatives of landlords or agents
                    </p>
                    <li>
<b>Identity & Contact</b>: Name, business email, phone, company name

                    </li>
                    <li>
<b>Financial Data</b>: Bank account details for rewards payouts

                    </li>
                    <li>
<b>Property Data</b>: Address and related info

                    </li>
                    <li>
<b>Usage & Technical Data</b>: includes information about how you use our website, and our Services.

                    </li>
                    <p className=" mt-3">
For Website Users
                    </p>
                    <li>
                        <b>Technical Data</b>:  This includes, computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, the device type, operating system, unique device identifiers, device settings, and geo-location data.
                    </li>
                    <p className="my-2">We may also collect, use, and share Aggregated Data—such as statistical or demographic information—for various purposes. While this type of data may be derived from your personal information, it is not legally considered personal data because it does not directly or indirectly identify you. For instance, we might use your Usage Data to determine the percentage of users who engage with a particular feature of our website. However, if we combine or link Aggregated Data with personal information in a way that could identify you, we will treat that combined data as personal data and handle it in accordance with this privacy policy.

                    </p>
                    <b>If you fail to provide personal data</b>
                    <p className="mt-2">In certain situations, we are required by law or by the terms of a contract to collect personal data from you. If you do not provide this information when requested, we may not be able to fulfill the contract we have with you—or are attempting to enter into with you—such as delivering our Services. If this happens, we may need to cancel a Service you’ve requested or purchased. If so, we will inform you at the time.</p>
           </div>
            <h3 className="font-semibold text-lg  mt-3">7. Data Sources</h3>
            <p>
              Data comes directly from you, through cookies, or from partners like payment processors.
            </p>
            <h3 className="font-semibold text-lg mt-3">8. How is your personal data collected?</h3>
            <p>
            We use different methods to collect data from and about you including through:
            </p>
            <li className="mt-3">
                <b>Direct interactions</b>
                <p>You may provide us with your personal data by completing forms or by communicating with us via post, phone, email, or other methods. This includes any personal information you share when you:</p>
            </li>
            <div className="ps-6">
                <li>Request access to our Services</li>
                <li>
                    create an account on our website;
                </li>
                <li>subscribe to our publications;</li>
                <li>
                    request marketing to be sent to you; or
                </li>
                <li>
                    give us feedback or contact us.
                </li>
            </div>
            <li className="mt-3">
                <b>Automated technologies or interactions. </b>
                <p>When you interact with our website, we automatically collect Technical Data about your device, browsing behaviour, and usage patterns. This information is gathered through cookies, server logs, and similar technologies. Additionally, we may receive Technical Data if you visit other websites that use our cookies. For more information, please refer to our Cookie Policy.</p>
            </li>
<div className="overflow-x-auto">
  <table className="min-w-full mt-4 text-sm border border-gray-300 dark:border-gray-700">
    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <tr>
        <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left">Purpose</th>
        <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left">Data Used</th>
        <th className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left">Legal Basis</th>
      </tr>
    </thead>
    <tbody className="text-gray-800 dark:text-gray-300">
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">To register you and create your account as a new customer, including individual tenants or representatives of organisations (e.g., corporate tenants).</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Identity, Contact, Biometrics, KYC, Tenancy, technical</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Contractual necessity, Compliance with a legal obligation</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Process rent payments & rewards, Manage payments, fees and charges, To collect and recover outstanding payments due to us or third parties.</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Transaction, Financial, Marketing Communication</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Contractual necessity, Necessary for our legitimate interests (to recover debts due to us), Consent</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">To manage and safeguard our business and website operations, including troubleshooting, data analysis, testing, system maintenance, technical support, reporting, and data hosting.</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Contact, Identity, Technical</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Required to support our legitimate interests—such as operating our business, providing administrative and IT services, ensuring network security, preventing fraud, and managing business reorganisations or group restructurings.</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">To provide you with relevant website content and advertisements, and to assess the effectiveness of our advertising efforts. This may involve ‘profiling’ to analyze certain characteristics about you; however, this does not result in any legal or similarly significant impact on you.</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Identity,
            Contact
            Profile,
            Usage,
            Marketing and Communications,
            Technical
        </td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Necessary for our legitimate interests (to study how customers use our Services, to develop them, to grow our business and to inform our marketing strategy)</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">To use data analytics to improve our website, Services, marketing, customer relationships and experiences	</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Technical, Usage</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Necessary for our legitimate interests (to define types of customers for our Services, to keep our website updated and relevant, to develop our business and to inform our marketing strategy)</td>
      </tr>
      {/* <tr>
        <td>
        </td>
        <td>Communication Details, Device and System Information,  Interaction and Activity Data, Profile, Marketing and Communications</td>
        <td>Necessary for our legitimate interests (to develop our Services and grow our business)</td>
      </tr> */}
        <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">To make suggestions and recommendations to you about Services that may be of interest to you</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Communication Details, Device and System Information,  Interaction and Activity Data, Profile, Marketing and Communications</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Necessary for our legitimate interests (to develop our Services and grow our business)</td>
      </tr>
    </tbody>
  </table>
</div>

            <h3 className="font-semibold text-lg mt-3">9. Marketing</h3>
            <div>
<p className="my-2">We aim to give you control over how your personal data is used, especially when it comes to marketing and advertising.</p>
<p>
    We may use details such as your Identity, Contact, Technical, Usage, and Profile information to better understand your interests and preferences. This helps us determine which of our Services or offers may be most relevant to you — this is what we refer to as marketing.
</p>
<p className="my-2">
    If you are an individual tenant, you may receive marketing messages from us if you have given your consent, or if you’ve previously requested information or purchased Services from us and haven’t opted out of marketing communications.
</p>

            </div>
            <h3 className="font-semibold text-lg mt-3" >10. Cookies</h3>
            <p>
We use cookies to optimize the experience, remember preferences, and perform analytics. You may disable cookies in your browser, though this could limit functionality. See our [Cookie Policy] for details.

            </p>
            <h3 className="font-semibold mt-3 text-lg">11. Sharing Data</h3>
            <p>
We may share your data with:
<li>
Service providers (e.g. payment, verification, email, hosting)

</li>
<li>
Landlords (to credit rewards where applicable)

</li>
<li className="mb-2">
Legal or regulatory bodies, as required

</li>
All processors are contractually bound to protect your data, and we don’t sell your information.            </p>
            <p>We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>

            <h3 className="font-semibold text-lg mt-3">12. International Transfers</h3>
            <p>
If your data is processed outside the UK, we ensure adequate protections are in place—such as EU/UK-approved Standard Contractual Clauses or transfers to countries deemed adequate by the UK government.
            </p>
            <h3 className="font-semibold text-lg mt-3">13. Security</h3>
            <p>
We maintain technical and organizational measures—such as encryption and restricted access—to protect personal data. Data breach protocols are in place, and affected users/regulators will be notified if required by law. We have established procedures to respond to any suspected breach of personal data. Where required by law, we will notify you and the appropriate regulatory authorities of any such breach.



            </p>
            <h3 className="font-semibold text-lg mt-3">14. Retention</h3>
            <p>
We retain your personal data only as long as needed to provide our services, comply with legal requirements, resolve disputes, or enforce agreements. Details on retention periods are available upon request. To determine the appropriate retention period for personal data, we consider the amount, nature and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.



            </p>
            <h3 className="font-semibold text-lg mt-3">15. Your Legal Rights</h3>
            <div>
                <p>
You have the following rights concerning your personal data:
                </p>
<li>
<b>Access</b>: You can request a copy of the personal data we hold about you to ensure we are processing it lawfully.
</li>
<li>
<b>Correction</b>: You can ask us to correct any incomplete or inaccurate data we hold about you. We may need to verify the accuracy of the new data you provide.
</li>
<li>
    <b>Erasure</b>: You can request the deletion of your personal data where there is no valid reason for us to continue processing it. This also applies if you have successfully objected to processing, if your data was processed unlawfully, or if we are legally required to erase it. Note that we may not always be able to fulfill your request for legal or regulatory reasons, which will be communicated to you at the time.
</li>
<li>
<b>
Objection
</b>: You can object to our processing of your data where it is based on our legitimate interests (or those of a third party), particularly if it affects your fundamental rights and freedoms. You can also object to the use of your data for direct marketing purposes. In some cases, we may demonstrate compelling legitimate grounds to continue processing your data.
</li>
<li className="my-4">
<b>
Restriction

</b>: You can ask us to temporarily suspend the processing of your data in the following situations:
</li>
<div className="ps-7 ">
    <li>
        If you want us to verify the accuracy of your data.
    </li>
    <li>
        Where the use of your data is unlawful but you prefer restriction over deletion.
    </li>
    <li>
        If you need us to retain the data for legal claims, even if we no longer require it.
    </li>
    <li>
        You’ve objected to our use of your data and we are verifying whether we have overriding legitimate grounds.
    </li>
</div>
<li>
    <b>Data Portability</b>: You can request the transfer of your data to you or a third party. We will provide it in a structured, commonly used, machine-readable format. This right applies only to automated data processed based on your consent or a contract.
</li>
<li>
    <b>Withdraw Consent</b>:  You can withdraw your consent at any time where we rely on it to process your data. This does not affect the lawfulness of any processing done before the withdrawal. Note that withdrawing consent may affect our ability to provide certain services, and we will inform you of this if applicable.
</li>





To exercise your rights, contact us at support@nubarewards.com. We generally respond within one month, though complex requests may require additional time.

            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}