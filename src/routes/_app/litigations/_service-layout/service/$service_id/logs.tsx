import ServiceLogs from "@/components/app/service/ServiceLogs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/litigations/_service-layout/service/$service_id/logs"
)({
  component: ServiceLogs,
});

function RouteComponent() {
  return <div>Hello "/_app/_service-layout/service/$service_id/logs"!</div>;
}
