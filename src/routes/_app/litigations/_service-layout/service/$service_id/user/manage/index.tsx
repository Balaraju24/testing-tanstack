import ManageComponent from "@/components/app/service/manage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/litigations/_service-layout/service/$service_id/user/manage/"
)({
  component: ManageComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/_app/_service-layout/service/$service_id/user/manage/"!</div>
  );
}
