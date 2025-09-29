import EngineerPropertyValuation from "@/components/app/engineer-property-valuation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/engineer-property-valuation/")({
  component: EngineerPropertyValuation,
});
