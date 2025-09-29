import UserReview from "@/components/app/user-review";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/review/$service_id/")({
  component: UserReview,
});
