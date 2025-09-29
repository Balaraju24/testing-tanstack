import ServiceChat from "@/components/app/service/ServiceChat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/legal-opinion/_service-layout/service/$service_id/chat"
)({
  component: ServiceChat,
});

function RouteComponent() {
  return <div>Hello "/_app/_service-layout/service/$service_id/chat"!</div>;
}
