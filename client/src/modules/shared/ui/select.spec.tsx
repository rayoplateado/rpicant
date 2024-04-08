import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Select, SelectItem } from "./select";
import userEvent from "@testing-library/user-event";

test("Select", async () => {
  const user = userEvent.setup();
  render(
    <Select name="test" label="Test">
      <SelectItem value="option1">First</SelectItem>
      <SelectItem value="option2">Second</SelectItem>
    </Select>,
  );

  await user.click(screen.getByText("Select...", { selector: "span" }));
  await user.click(screen.getByText("Second", { selector: "span" }));
  const select = screen.getByLabelText("Test") as HTMLSelectElement
  expect(select.value).toBe("option2");
});
