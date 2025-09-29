import ServiceFiles from "@/components/app/service/ServiceFiles";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/_service-layout/service/$service_id/files"
)({
  component: ServiceFiles,
});

function RouteComponent() {
  return <div>Hello "/_app/_service-layout/service/$service_id/files"!</div>;
}
