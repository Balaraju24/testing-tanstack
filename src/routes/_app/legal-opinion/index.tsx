import LegalOpinion from "@/components/app/legal-opinion";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/legal-opinion/")({
  component: LegalOpinion,
});
