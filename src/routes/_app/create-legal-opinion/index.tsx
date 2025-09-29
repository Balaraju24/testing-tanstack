import CreateLegalOpinion from "@/components/app/legal-opinion/create-legal-opinion";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/create-legal-opinion/")({
  component: CreateLegalOpinion,
});


