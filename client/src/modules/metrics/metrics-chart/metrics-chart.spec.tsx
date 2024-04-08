import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricsChart } from "./metrics-chart";
import { mockMetricsByPeriod } from "./test-utils";
import userEvent from "@testing-library/user-event";
import { useMetricsAverages } from "./use-metrics-averages";

vi.mock("../shared/use-metrics", () => {
  return {
    useMetrics: vi.fn(() => {
      return {
        data: [
          {
            name: "Temperature",
          },
        ],
      };
    }),
  };
});

vi.mock("./use-metrics-averages", () => {
  return {
    useMetricsAverages: vi.fn(() => {
      return {
        data: mockMetricsByPeriod(),
        isLoading: false,
        isSuccess: true,
      };
    }),
  };
});

vi.mock("../../shared/ui/chart", () => {
  return {
    Chart: () => <h1>chart</h1>,
  };
});

describe("MetricsChart", () => {
  it("should render a Chart", () => {
    render(<MetricsChart />);
    expect(screen.findByText("chart")).toBeDefined();
  });

  it("should sync select and query", async () => {
    const user = userEvent.setup();
    render(<MetricsChart />);
    await user.click(screen.getByText("Minutes", { selector: "span" }));
    await user.click(screen.getByText("Hours", { selector: "span" }));

    await user.click(screen.getByText("Line", { selector: "span" }));
    await user.click(screen.getByText("Area", { selector: "span" }));

    await user.click(screen.getByText("Select...", { selector: "span" }));
    await user.click(screen.getByText("Temperature", { selector: "span" }));

    expect(useMetricsAverages).toHaveBeenCalledWith(
      expect.objectContaining({ period: "hour", metrics: ["Temperature"] }),
    );
  });

  it("should disable period selecting when loading", () => {
    vi.mocked(useMetricsAverages).mockReturnValueOnce({
      isLoading: true,
    } as ReturnType<typeof useMetricsAverages>);
    render(<MetricsChart />);
    expect(screen.getByRole("combobox", { name: "Period" })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: "Chart" })).toBeDisabled();
  });

  it("should show error dialog when loading metrics errors out", () => {
    vi.mocked(useMetricsAverages).mockReturnValue({
      isError: true,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useMetricsAverages>);
    render(<MetricsChart />);
    expect(
      screen.getByText("There was an error loading your metrics"),
    ).toBeDefined();
  });
});
