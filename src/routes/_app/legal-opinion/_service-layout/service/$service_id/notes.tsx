import ServiceNotes from "@/components/app/service/ServiceNotes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/legal-opinion/_service-layout/service/$service_id/notes"
)({
  component: ServiceNotes,
});

function RouteComponent() {
  return <div>Hello "/_app/_service-layout/service/$service_id/notes"!</div>;
}
