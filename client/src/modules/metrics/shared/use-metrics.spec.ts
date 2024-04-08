import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useMetrics} from "./use-metrics";
import { ReactQueryTestWrapper } from "../../shared/test-utils/react-query";

vi.mock("./get-metrics-service", () => {
  return {
    getMetrics: vi.fn(async () => [
      { name: "Temperatue" },
      { name: "Humidity" },
    ]),
  };
});

test("useMetrics", async () => {
  const { result } = renderHook(() => useMetrics(), {
    wrapper: ReactQueryTestWrapper,
  });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.isSuccess).toBeTruthy();
  expect(result.current.data).toEqual([
    { name: "Temperatue" },
    { name: "Humidity" },
  ]);
});
