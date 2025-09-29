import Litigations from "@/components/app/litigation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/litigations/")({
  component: Litigations,
});

