import { screen, render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PageLayout } from "./page-layout";

describe("PageLayout", () => {
  test("should render children", () => {
    render(<PageLayout layout="narrow">ClimatePulse</PageLayout>);
    expect(screen.getByText("ClimatePulse")).toBeDefined();
  });

  test("should render layouts", () => {
    render(<PageLayout layout="narrow">ClimatePulse</PageLayout>);
    expect(screen.getByTestId("page-layout-narrow")).toBeDefined();

    render(<PageLayout layout="wide">ClimatePulse</PageLayout>);
    expect(screen.getByTestId("page-layout-wide")).toBeDefined();
  });
});
