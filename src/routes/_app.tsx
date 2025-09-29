import { MainComponent } from "@/components/layout/MainComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: MainComponent,
});
