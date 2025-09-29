import AddSubStageComponent from "@/components/app/service/manage/AddSubStageComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/litigations/add-sub-stage/")({
  component: AddSubStageComponent,
});
