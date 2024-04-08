import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useMetricsAverages } from "./use-metrics-averages";
import { ReactQueryTestWrapper } from "../../shared/test-utils/react-query";
import { mockMetricsByPeriod } from "./test-utils";

vi.mock("./metrics-averages-by-period-service", () => {
  return {
    metricsAveragesByPeriodService: vi.fn(async () => mockMetricsByPeriod()),
  };
});

test("useMetricsAverages", async () => {
  expect(process.env.TZ).toBe("UTC");

  const { result } = renderHook(
    () => useMetricsAverages({ period: "minute" }),
    {
      wrapper: ReactQueryTestWrapper,
    },
  );
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.isSuccess).toBeTruthy();
  expect(result.current.data).toEqual({
    categories: mockMetricsByPeriod()
      .flatMap((x) => Object.keys(x).filter((y) => y !== "date"))
      .filter((value, index, array) => array.indexOf(value) === index),
    dataset: mockMetricsByPeriod().map((x) => {
      return {
        ...x,
        date: new Intl.DateTimeFormat("en", {
          dateStyle: "short",
          timeStyle: "medium",
        }).format(new Date(x.date)),
      };
    }),
  });
});
