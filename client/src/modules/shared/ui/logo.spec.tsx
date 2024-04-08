import { screen, render } from "@testing-library/react"
import { expect, test } from "vitest"
import { Logo } from "./logo"

test('Header', () => {
  render(<Logo />)
  expect(screen.getByText("ClimatePulse")).toBeDefined()
})
