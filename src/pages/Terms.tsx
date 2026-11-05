import { LegalPage } from "../components/layout/LegalPage";
import { TERMS } from "../data/legal";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Terms() {
  useDocumentMeta({ title: "Terms and Conditions", description: "Terms and conditions, refund policy and cancellation policy for MineCryptos mining services." });
  return <LegalPage title="Terms and Conditions" crumb="Terms and Conditions" intro="The rules for using MineCryptos services, including our refund and cancellation policies." sections={TERMS} />;
}
