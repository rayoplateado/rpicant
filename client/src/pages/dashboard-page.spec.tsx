import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ReactNode } from "react";
import { DashboardPage } from "./dashboard-page";

vi.mock("../modules/metrics/metrics-chart", () => {
  return {
    MetricsChart: () => <h1>Chart</h1>,
  };
});

vi.mock("@tanstack/react-router", () => {
  return {
    Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  };
});

test("DashboardPage", () => {
  render(<DashboardPage />);
  expect(screen.getByText("Chart")).toBeInTheDocument();
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Add measurement")).toBeInTheDocument();
});
