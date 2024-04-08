import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { AddMeasurementPage } from "./add-measurement-page";
import { ReactNode } from "react";

vi.mock("../modules/metrics/add-measurement", () => {
  return {
    AddMeasurement: () => <h1>Measurement</h1>,
  };
});

vi.mock("@tanstack/react-router", () => {
  return {
    Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  };
});

test("AddMeasurementPage", () => {
  render(<AddMeasurementPage/>);
  expect(screen.getByText("Measurement")).toBeInTheDocument();
  expect(screen.getByText("Back to Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Add measurement")).toBeInTheDocument();
});
