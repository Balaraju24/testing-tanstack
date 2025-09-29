import ServiceCaseHistory from "@/components/app/service/ServiceCaseHistory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/_service-layout/service/$service_id/case-history"
)({
  component: ServiceCaseHistory,
});

function RouteComponent() {
  return (
    <div>Hello "/_app/_service-layout/service/$service_id/case-history"!</div>
  );
}
