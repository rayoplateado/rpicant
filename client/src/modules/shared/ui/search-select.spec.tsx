import { screen, render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchSelect, SearchSelectItem } from "./search-select";
import userEvent from "@testing-library/user-event";

describe("SearchSelect", () => {
  test("should work like a simple select", async () => {
    render(
      <SearchSelect name="test" label="Test">
        <SearchSelectItem value="option1">First</SearchSelectItem>
        <SearchSelectItem value="option2">Second</SearchSelectItem>
      </SearchSelect>,
    );
    const searchInput = screen.getByPlaceholderText(
      "Select...",
    ) as HTMLInputElement;

    await userEvent.type(searchInput, "Sec");
    await userEvent.click(screen.getByText("Second", { selector: "span" }));
    const select = screen.getByLabelText("Test") as HTMLSelectElement;
    expect(select.value).toBe("option2");
  });

  test("should give the user the option to add a custom one at the bottom", async () => {
    const user = userEvent.setup()
    render(
      <SearchSelect name="test" label="Test">
        <SearchSelectItem value="First">First</SearchSelectItem>
        <SearchSelectItem value="Second">Second</SearchSelectItem>
      </SearchSelect>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Select...",
    ) as HTMLInputElement;

    await user.type(searchInput, "Third");
    await user.click(screen.getByText("Third", { selector: "span" }));
    const select = screen.getByLabelText("Test") as HTMLSelectElement;
    expect(select.value).toBe("Third");

    await user.click(screen.getByText("Third"));
    await user.clear(searchInput);
    await user.click(searchInput);
    expect(screen.getByText("Just type and select to add a new metric")).toBeInTheDocument();
  });
});
