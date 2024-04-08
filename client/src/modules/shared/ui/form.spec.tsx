import { describe, expect, test, vi } from "vitest";
import { Form } from "./form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Form", () => {
  test("should pass along values from all fields", async () => {
    const onSubmit = vi.fn();
    render(
      <Form title="Hello Forms" onSubmit={onSubmit}>
        <input name="hello" placeholder="hello" />
        <button type="submit">Send</button>
      </Form>,
    );
    await userEvent.type(screen.getByPlaceholderText("hello"), "world")
    await userEvent.click(screen.getByRole("button"))
    expect(onSubmit).toHaveBeenCalledWith({
      hello: "world"
    })
  });
  test("should render title", () => {
    render(
      <Form title="Hello Forms" onSubmit={vi.fn()}>
        <button type="submit">Send</button>
      </Form>,
    );
    expect(screen.getByText("Hello Forms")).toBeDefined()
  });
  test("should render subtitle", () => {
    render(
      <Form title="Hello Forms" subtitle="Explain more stuff" onSubmit={vi.fn()}>
        <button type="submit">Send</button>
      </Form>,
    );
    expect(screen.getByText("Explain more stuff")).toBeDefined()
  });
});
