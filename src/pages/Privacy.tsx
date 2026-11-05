import { LegalPage } from "../components/layout/LegalPage";
import { PRIVACY } from "../data/legal";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Privacy() {
  useDocumentMeta({ title: "Privacy Policy", description: "How MineCryptos collects, uses, discloses and safeguards your personal information." });
  return <LegalPage title="Privacy Policy" crumb="Privacy Policy" intro="How we collect, use and protect your personal information." sections={PRIVACY} />;
}
