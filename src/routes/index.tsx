import { createFileRoute } from "@tanstack/react-router";
import { CalculatorApp } from "@/components/calculator-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CalculatorApp />;
}
