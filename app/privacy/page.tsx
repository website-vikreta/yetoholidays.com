import { LegalDocument, legalMetadata } from "@/components/legal";

export const metadata = legalMetadata("privacy");

export default function Privacy() {
  return <LegalDocument slug="privacy" />;
}
