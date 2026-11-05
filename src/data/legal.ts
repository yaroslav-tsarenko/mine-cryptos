export type LegalSection = { id: string; title: string; paragraphs: string[]; list?: string[] };

export const LEGAL_UPDATED = "November 1, 2026";

export const PRIVACY: LegalSection[] = [
  { id: "overview", title: "Overview", paragraphs: ["At MineCryptos, we take your privacy seriously. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information. By using our services, you consent to the practices described in this policy."] },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: ["We may collect the following types of information:"],
    list: [
      "Personal information: your name, email address and other contact information, which we collect when you register for our services or contact our support team.",
      "Payment information: we collect and process payment information for billing and service purposes, including wallet addresses and transaction history.",
      "Log data: information that your browser sends whenever you visit our website, such as your IP address, browser type, browser version and the pages you visit.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    paragraphs: ["We use the information we collect for the following purposes:"],
    list: [
      "Service delivery: to provide the services you've requested, including hosting, maintenance and support.",
      "Billing and transactions: to bill for services and facilitate transactions related to them.",
      "Communication: to respond to your inquiries and send updates and information about our services.",
      "Improvements: non-identifying information may be used for statistical analysis, service enhancements and research.",
    ],
  },
  { id: "data-security", title: "Data Security", paragraphs: ["We employ industry-standard security measures to protect your data and maintain the confidentiality of your information. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security."] },
  { id: "data-disclosure", title: "Data Disclosure", paragraphs: ["We do not share your personal information with third parties unless required by law or to provide you with the services you've requested."] },
  { id: "cookies", title: "Cookies", paragraphs: ["We use cookies to collect information and improve your experience on our website. You can manage your cookie preferences through your browser settings. This demo site only stores your preferences (such as your watchlist) in your browser's local storage."] },
  { id: "your-rights", title: "Your Rights", paragraphs: ["Depending on where you live, you may have the right to access, correct, export or delete your personal data, and to object to certain processing. To exercise these rights, contact our support team."] },
  { id: "changes", title: "Changes to This Policy", paragraphs: ["We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal or regulatory reasons. Your continued use of our services after any updates constitutes acceptance of the updated policy."] },
  { id: "contact", title: "Contact Us", paragraphs: ["If you have questions or concerns about our Privacy Policy or data practices, please contact us at support@minecryptos.example or through our contact page."] },
];

export const TERMS: LegalSection[] = [
  { id: "introduction", title: "Introduction", paragraphs: ["Please read these terms and conditions carefully before using the services provided by MineCryptos. By using our services, you agree to abide by these terms and conditions. If you do not agree with these terms, please refrain from using our services."] },
  { id: "services", title: "1. Services", paragraphs: ["MineCryptos provides cryptocurrency mining hosting, hashpower contracts and related services to customers. By using our services, you agree to adhere to all applicable laws and regulations."] },
  { id: "accounts", title: "2. User Accounts", paragraphs: ["You may be required to create an account to access certain services. You are responsible for maintaining the confidentiality of your account information and for any activity that occurs under your account."] },
  { id: "payments", title: "3. Payments", paragraphs: ["All fees and charges are due and payable as per the terms of the service agreement. Failure to pay fees may result in the suspension or termination of your services. 20% VAT applies to UK-based customers."] },
  { id: "returns", title: "4. Mining Returns", paragraphs: ["Mining rewards depend on network difficulty, block rewards, coin prices and other factors outside our control. Estimates shown on our website, including in the profit calculator, are illustrative and are not a guarantee of future returns."] },
  {
    id: "refunds",
    title: "5. Refund Policy",
    paragraphs: ["We want you to be happy with your hashpower. Refunds are handled as follows:"],
    list: [
      "Monthly contracts cancelled within 14 days of purchase receive a pro-rated refund of the unused period.",
      "If uptime falls below your plan's SLA in a billing period, service credits are applied automatically.",
      "Hourly contracts are billed for time used and are not refundable once mining has started.",
      "Refunds are paid in the original payment currency within 5 business days.",
    ],
  },
  {
    id: "cancellation",
    title: "6. Cancellation Policy",
    paragraphs: ["You may cancel your services at any time from your dashboard or by contacting support."],
    list: [
      "Hourly contracts can be stopped instantly; you pay only for hours used.",
      "Monthly contracts can be cancelled within 14 days for a pro-rated refund; after that, the contract runs until the end of its term.",
      "Enterprise agreements follow the notice period set out in your individual contract.",
    ],
  },
  { id: "privacy", title: "7. Privacy", paragraphs: ["Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use and safeguard your personal information."] },
  { id: "conduct", title: "8. User Conduct", paragraphs: ["You agree not to engage in any activity that disrupts or interferes with the proper functioning of our services. You also agree not to attempt unauthorized access to our systems."] },
  { id: "data-loss", title: "9. Data Backup and Loss", paragraphs: ["We are not responsible for any data loss resulting from the termination of services. It is your responsibility to back up your data and to keep your wallet keys safe."] },
  { id: "ip", title: "10. Intellectual Property", paragraphs: ["All content on our website and associated materials is protected by copyright, trademark and other intellectual property laws. You may not use our content without our explicit permission."] },
  { id: "changes-to-services", title: "11. Changes to Services", paragraphs: ["We reserve the right to modify, suspend or discontinue any part of our services at any time. We will give reasonable notice of material changes where possible."] },
  { id: "liability", title: "12. Limitation of Liability", paragraphs: ["We are not liable for any indirect, special or consequential damages, or for any loss of data or profits. Our total liability is limited to the amount paid for the services."] },
  { id: "law", title: "13. Governing Law", paragraphs: ["These terms and conditions are governed by the laws of England and Wales, and you agree to submit to the exclusive jurisdiction of its courts."] },
  { id: "changes-to-terms", title: "14. Changes to These Terms", paragraphs: ["We may revise these terms and conditions at any time. Any changes will be effective upon posting on our website. If you have any questions or concerns, please contact us at support@minecryptos.example."] },
];
