
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { NumberInput } from "./number-input";
import userEvent from "@testing-library/user-event";

test("NumberInput", async () => {
  render(
    <form>
      <NumberInput name="test" label="Test" />
    </form>,
  );
  const input = screen.getByLabelText("Test") as HTMLInputElement;
  await userEvent.type(input, "30")
  expect(input.value).toBe("30");

  await userEvent.type(input, "ABC")
  expect(input.value).toBe("30");
} );
