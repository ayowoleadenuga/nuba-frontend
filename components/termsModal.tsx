'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

export default function TermsModal({ open, onClose }) {
  return (
    <Dialog className="" open={open} onOpenChange={onClose}>
      <DialogContent className="xl:max-w-5xl h-[100vh] overflow-auto lg:max-w-3xl max-h-[90vh] p-0 rounded-2xl">
        <div className="relative bg-white dark:bg-gray-900 flex flex-col h-full">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Terms & Conditions
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Last updated: 26th June, 2025
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable content */}
<ScrollArea className="flex-1 p-6 space-y-4 text-gray-700 dark:text-gray-300 overflow-x-auto">
            <p>These are the terms and conditions on which we provide our website and our services. You must accept these terms when signing up or making payments through our service.</p>

            <h3 className="font-semibold text-lg">About us and our services</h3>
            <p>We are Nuba Technologies LTD, registered in England and Wales. Nuba is not a payment provider and works with licensed partners in the UK to provide regulated services.</p>

            <h3 className="font-semibold text-lg">Third-party partners</h3>
            <p>We work with partners such as Moorwand and Ryft Pay, both authorized by the FCA, to process payments. We may change partners from time to time, and we will notify you when this happens.</p>

            <h3 className="font-semibold text-lg">Account creation and verification</h3>
            <p>To use our services, you must create an account and pass a verification process. You are responsible for keeping your account secure and notifying us if your account is compromised.</p>

            <h3 className="font-semibold text-lg">Using our services</h3>
            <p>Once verified, you can use your account to make rent payments. You are responsible for ensuring payment details are correct. Payments may be declined for regulatory or technical reasons.</p>

            <h3 className="font-semibold text-lg">Service availability</h3>
            <p>Our services may occasionally be unavailable due to maintenance or technical issues. We aim to notify you in advance when possible.</p>

            <h3 className="font-semibold text-lg">Our fees</h3>
            <p>Our fees are listed on our website. They apply to each transaction you make. You will be notified at least 30 days before any fee increases.</p>

            <h3 className="font-semibold text-lg">Refunds</h3>
            <p>Payments made through our service are non-refundable once processed to your landlord. If a refund is needed, you must contact your landlord directly.</p>

            <h3 className="font-semibold text-lg">Incorrect or unauthorized payments</h3>
            <p>If you suspect unauthorized activity, contact us immediately. We'll attempt to recover funds in cases of incorrect details but cannot guarantee recovery.</p>

            <h3 className="font-semibold text-lg">Your responsibilities</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use our services lawfully and in compliance with regulations.</li>
              <li>Do not misuse the service to overload our platform.</li>
              <li>Do not attempt to reverse-engineer our software.</li>
            </ul>

            <h3 className="font-semibold text-lg">Liability</h3>
            <p>We are not responsible for losses caused by factors outside our control, errors in payment information you provide, or your relationship with your landlord.</p>

            <h3 className="font-semibold text-lg">Changes to these terms</h3>
            <p>We may update these terms to reflect changes in laws or service improvements. We'll notify you of significant changes via email.</p>

            <h3 className="font-semibold text-lg">Governing law</h3>
            <p>These terms are governed by English law. Disputes may be resolved in the courts of England, Wales, Scotland, or Northern Ireland, depending on your location.</p>

            <h3 className="font-semibold text-lg">Complaints</h3>
            <p>For complaints, contact us at support@nuba.com.</p>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
