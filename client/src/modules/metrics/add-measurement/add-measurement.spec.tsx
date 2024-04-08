import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { AddMeasurement } from "./add-measurement";
import { ReactQueryTestWrapper } from "../../shared/test-utils/react-query";
import { addMeasurementService } from "./add-measurement-service";
import { useMetrics } from "../shared/use-metrics";

vi.mock("@tanstack/react-router", () => {
  return {
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../shared/use-metrics");

vi.mock("./add-measurement-service", () => {
  return {
    addMeasurementService: vi.fn(),
  };
});

/**
 * @disclaimer
 * "datetime-local" inputs are known to be hard to test.
 * https://github.com/testing-library/user-event/issues/688
 * So for now we'll have to be satisfied with just testing the
 * default value on Time input.
 * */
describe("AddMeasurement", () => {
  it("should be able to send form data to service", async () => {
    vi.mocked(useMetrics).mockReturnValue({
      data: [{ name: "Temperature" }],
      isSuccess: true,
    } as ReturnType<typeof useMetrics>);

    const user = userEvent.setup();

    render(
      <ReactQueryTestWrapper>
        <AddMeasurement />
      </ReactQueryTestWrapper>,
    );

    const { timeInput } = await fill(user);
    await submit(user);

    expect(addMeasurementService).toHaveBeenCalledWith({
      metric: "Temperature",
      timestamp: new Date(timeInput.value).toISOString(),
      value: 30,
    });
    expect(screen.getByText("Measurement added successfully")).toBeDefined();
  });

  it("should show the error modal when metrics are not loaded", async () => {
    const user = userEvent.setup();
    const mockRetry = vi.fn();
    vi.mocked(useMetrics).mockReturnValue({
      isSuccess: false,
      isError: true,
      refetch: mockRetry as unknown,
    } as ReturnType<typeof useMetrics>);
    render(
      <ReactQueryTestWrapper>
        <AddMeasurement />
      </ReactQueryTestWrapper>,
    );
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(mockRetry).toHaveBeenCalled();
  });

  it("should disable block the submit button when loading", async () => {
    vi.mocked(useMetrics).mockReturnValue({
      isSuccess: false,
      isError: false,
    } as ReturnType<typeof useMetrics>);
    render(
      <ReactQueryTestWrapper>
        <AddMeasurement/>
      </ReactQueryTestWrapper>,
    );
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("should disabled the submit button when submitting", async () => {
    vi.mocked(useMetrics).mockReturnValue({
      data: [{ name: "Temperature" }],
      isSuccess: true,
    } as ReturnType<typeof useMetrics>);
    vi.mocked(addMeasurementService).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const user = userEvent.setup();
    render(
      <ReactQueryTestWrapper>
        <AddMeasurement />
      </ReactQueryTestWrapper>,
    );
    await fill(user);
    const { submitButton } = await submit(user);
    expect(submitButton).toBeDisabled();
  });
});

async function fill(user: UserEvent) {
  const metricInput = screen.getByLabelText("Metric") as HTMLSelectElement;
  await user.type(metricInput, "Temp");
  await user.click(screen.getByText("Temperature", { selector: "span" }));

  const valueInput = screen.getByLabelText("Value") as HTMLSelectElement;
  await user.type(valueInput, "30");

  const timeInput = screen.getByLabelText("Time") as HTMLSelectElement;

  return { metricInput, valueInput, timeInput };
}

async function submit(user: UserEvent) {
  const submitButton = screen.getByRole("button", {
    name: "Add",
  });

  await user.click(submitButton);

  return { submitButton };
}
