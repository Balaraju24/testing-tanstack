import ReviewsList from "@/components/app/reviews";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reviews/")({
  component: ReviewsList,
});
