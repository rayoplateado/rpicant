import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { MultiSelect, MultiSelectItem } from "./multi-select";
import userEvent from "@testing-library/user-event";

test("MultiSelect", async () => {
  render(
    <MultiSelect name="test" label="Test">
      <MultiSelectItem value="option1">First</MultiSelectItem>
      <MultiSelectItem value="option2">Second</MultiSelectItem>
    </MultiSelect>,
  );
  await userEvent.click(screen.getByText("Select...", { selector: "span" }));
  await userEvent.click(screen.getByText("First", { selector: "span" }));
  await userEvent.click(screen.getByText("Second", { selector: "span" }));
  const select = screen.getByLabelText("Test") as HTMLSelectElement;
  expect(Array.from(select.selectedOptions).map((x) => x.value)).toEqual([
    "option1",
    "option2",
  ]);
});
