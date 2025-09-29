import PaymentsList from "@/components/app/payments";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/payments/")({
  component: PaymentsList,
});
