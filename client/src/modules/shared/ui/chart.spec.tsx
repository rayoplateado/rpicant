import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Chart } from "./chart";

vi.mock("@tremor/react", () => {
  return {
    LineChart: ({
      valueFormatter,
    }: {
      valueFormatter: (value: number) => number;
    }) => <h1>Line {valueFormatter(2.555)}</h1>,
    AreaChart: () => <h1>Area</h1>,
  };
});

describe("Charts", () => {
  test("line", () => {
    render(<Chart data={[]} categories={[]} kind="line" />);
    expect(screen.getByText("Line 2.56")).toBeInTheDocument();
  });
  test("area", () => {
    render(<Chart data={[]} categories={[]} kind="area" />);
    expect(screen.getByText("Area")).toBeInTheDocument();
  });
});
