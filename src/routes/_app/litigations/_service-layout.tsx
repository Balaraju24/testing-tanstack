import ServiceViewComponent from "@/components/app/service";
import { CaseStagesProvider } from "@/components/context/Provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/litigations/_service-layout")({
  component: ServiceViewComponent,
});
