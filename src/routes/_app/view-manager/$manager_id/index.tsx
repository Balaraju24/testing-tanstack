import ViewAdvocateComponent from "@/components/app/advocate/view-advocate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/view-manager/$manager_id/")({
  component: ViewAdvocateComponent,
});
