import CreateOrganization from "@/components/app/organization/create-organization";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/create-organization/")({
  component: CreateOrganization,
});
