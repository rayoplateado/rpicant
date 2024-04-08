import { test, vi, expect } from "vitest";
import { metricsAveragesByPeriodService } from "./metrics-averages-by-period-service";
import { client } from "../../shared/client/client";
import { mockMetricsByPeriod } from "./test-utils";

vi.mock("../../shared/client/client", () => {
  return {
    client: vi.fn(async () => ({
      data: [
        {
          date: "2024-03-29T20:01:00Z",
          Temperature: 30,
          Humidity: 80
        },
        {
          date: "2024-03-29T20:02:00Z",
          Temperature: 50,
          Humidity: 90,
        },
      ],
    })),
  };
});

test("metrics-averages-by-period-service", async () => {
  const metrics = await metricsAveragesByPeriodService("minute", ["Temperature", "Humidity"]);
  expect(client).toHaveBeenCalledWith("/metrics/measurements", {
    params: { period: "minute", metrics: ["Temperature", "Humidity"] },
  });
  expect(metrics).toEqual(mockMetricsByPeriod());
});
