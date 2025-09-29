import LawyersList from "@/components/app/advocate";
import OrganizationList from "@/components/app/organization";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/organizations/")({
  component: OrganizationList,
});
