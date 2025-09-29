import { CreateAdvocate } from "@/components/app/advocate/create-advocate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/create-manager/")({
  component: CreateAdvocate,
});
