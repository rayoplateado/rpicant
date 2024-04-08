import { expect, test, vi } from "vitest";
import { getMetrics } from "./get-metrics-service";

vi.mock("../../shared/client/client", () => {
  return {
    client: vi.fn(async () => {
      return {
        data:
          [
            {
              name: "Temperature",
            },
            {
              name: "Humidity",
            },
          ]
      }
    }),
  };
});

test("get-metrics", async () => {
  const result = await getMetrics();

  expect(result).toEqual([
    {
      name: "Temperature",
    },
    {
      name: "Humidity",
    },
  ]);
});
