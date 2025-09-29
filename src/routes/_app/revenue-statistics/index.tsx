import RevenueStatistics from "@/components/app/revenue-statistics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/revenue-statistics/")({
  component: RevenueStatistics,
});
