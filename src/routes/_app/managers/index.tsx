import ManagerList from "@/components/app/managers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/managers/")({
  component: ManagerList,
});
