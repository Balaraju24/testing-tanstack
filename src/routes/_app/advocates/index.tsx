import LawyersList from "@/components/app/advocate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/advocates/")({
  component: LawyersList,
});
