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
                        Identity & Contact: Name, email, phone, address
                    </li>
                    <li>
                        Account Info: Username, encrypted password
                    </li>
                    <li>
                        Transaction Data: Rent payments, rewards redeemed
                    </li>
                    <li>
                        Technical & Usage Data: IP address, browser/device info, activity logs
                    </li>
                    <li>
                        Marketing Preferences: Email opt‑ins/opt‑outs
                    </li>

                    <p className=" mt-3">
                        For Landlords / Agents
                    </p>
                    <li>
Identity & Contact: Name, business email, phone, company name

                    </li>
                    <li>
Financial Data: Bank account details for rewards payouts

                    </li>
                    <li>
Property Data: Address and related info

                    </li>
                    <li>
Usage & Technical Data: As above

                    </li>
                    <p className=" mt-3">
For Website Visitors

                    </p>
                    <li>
                        Technical & Usage Data: IP address, browser, device type, pages viewed, session duration, and location data 
                    </li>
           </div>
            <h3 className="font-semibold text-lg  mt-3">7. Data Sources</h3>
            <p>
              Data comes directly from you, through cookies, or from partners like payment processors.
            </p>
            <h3 className="font-semibold text-lg mt-3">8. How We Use Data</h3>
<p>
  We process your data based on the following lawful grounds:
</p>

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
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Create/manage your account</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Identity, Contact, Technical</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Contractual necessity</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Process rent payments & rewards</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Transaction, Financial</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Contractual necessity, Legitimate interest</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Send service updates & offers</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Contact, Profile, Marketing Preferences</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Consent or Legitimate interest</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Improve platform & detect fraud</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Technical, Usage</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Legitimate interest</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Comply with legal/regulatory obligations</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Identity, Transaction</td>
        <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Legal obligation</td>
      </tr>
    </tbody>
  </table>
</div>

            <h3 className="font-semibold text-lg mt-3">9. Marketing</h3>
            <p>
With your consent (or if you haven’t opted out), we may email you about new features, offers, or platform updates. You can opt out anytime by clicking the unsubscribe link or emailing us at support@nubarewards.com. Opt‑out does not affect transactional emails required for service.

            </p>
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
<li>
Legal or regulatory bodies, as required

</li>
All processors are contractually bound to protect your data, and we don’t sell your information.            </p>
            <h3 className="font-semibold text-lg mt-3">12. International Transfers</h3>
            <p>
If your data is processed outside the UK, we ensure adequate protections are in place—such as EU/UK-approved Standard Contractual Clauses or transfers to countries deemed adequate by the UK government.

            </p>
            <h3 className="font-semibold text-lg mt-3">13. Security</h3>
            <p>
We maintain technical and organizational measures—such as encryption and restricted access—to protect personal data. Data breach protocols are in place, and affected users/regulators will be notified if required by law.

            </p>
            <h3 className="font-semibold text-lg mt-3">14. Retention</h3>
            <p>
We retain your personal data only as long as needed to provide our services, comply with legal requirements, resolve disputes, or enforce agreements. Details on retention periods are available upon request.

            </p>
            <h3 className="font-semibold text-lg mt-3">15. Your Rights</h3>
            <p>
Depending on relevant data protection laws (e.g., UK GDPR), you may have rights to:
<li>
Access, correct, or delete your data

</li>
<li>
Object to or restrict processing

</li>
<li>
Request data portability

</li>
<li>
Withdraw consent

</li>
<li>
Lodge a complaint with the ICO

</li>





To exercise your rights, contact us at support@nubarewards.com. We generally respond within one month, though complex requests may require additional time.

            </p>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}