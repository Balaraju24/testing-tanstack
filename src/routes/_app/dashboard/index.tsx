import LegalDashboard from "@/components/app/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/")({
  component: LegalDashboard,
});
