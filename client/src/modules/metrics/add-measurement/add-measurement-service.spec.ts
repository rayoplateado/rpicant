import { expect, test, vi } from "vitest";
import { addMeasurementService } from "./add-measurement-service";

vi.mock("../../shared/client/client", () => {
  return {
    client: vi.fn(async () => ({
      success: true,
    })),
  };
});

test("add-measurement-service", async () => {
  const result = await addMeasurementService({
    metric: "Temperature",
    value: 30,
    timestamp: "2024-03-22T10:30:00Z",
  });
  expect(result.success).toEqual(true);
});
