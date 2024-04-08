import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DatetimeInput } from "./datetime-input";

/**
 * @disclaimer
 *
 * "datetime-local" inputs are known to be hard to test.
 *
 * https://github.com/testing-library/user-event/issues/688
 *
 * So for now we'll have to be satisfied with just testing the
 * default value impl.
 * */
beforeEach(() => {
  // tell vitest we use mocked time
  vi.useFakeTimers();
});

afterEach(() => {
  // restoring date after each test run
  vi.useRealTimers();
});

describe("DatetimeInput", async () => {
  it("has a default value of the datetime of first render", () => {
    vi.setSystemTime(new Date("1995-12-29T12:45:00Z"));
    render(
      <form>
        <DatetimeInput name="test" label="Test" />
      </form>,
    );
    const input = screen.getByLabelText("Test") as HTMLInputElement;
    expect(input.value).toBe("1995-12-29T12:45");
    vi.useRealTimers();
  });
});
