import { CreateAdvocate } from "@/components/app/advocate/create-advocate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/edit-advocate/$advocate_id/")({
  component: CreateAdvocate,
});
