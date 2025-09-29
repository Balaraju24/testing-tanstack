import ViewAdvocateComponent from "@/components/app/advocate/view-advocate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/view-advocate/$advocate_id/")({
  component: ViewAdvocateComponent,
});
