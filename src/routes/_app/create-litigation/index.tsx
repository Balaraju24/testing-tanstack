import CreateLitigation from "@/components/app/litigation/create-litigation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/create-litigation/")({
  component: CreateLitigation,
});

