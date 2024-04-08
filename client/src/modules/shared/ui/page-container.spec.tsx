import { screen, render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PageContainer } from "./page-container";

describe("PageContainer", () => {
  test("should render children", () => {
    render(<PageContainer>ClimatePulse</PageContainer>);
    expect(screen.getByText("ClimatePulse")).toBeDefined();
  });
});
