import { LegalDocument, legalMetadata } from "@/components/legal";

export const metadata = legalMetadata("terms");

export default function Terms() {
  return <LegalDocument slug="terms" />;
}
