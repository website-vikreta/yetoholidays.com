import { LegalDocument, legalMetadata } from "@/components/legal";

export const metadata = legalMetadata("cancellation-policy");

export default function CancellationPolicy() {
  return <LegalDocument slug="cancellation-policy" />;
}
