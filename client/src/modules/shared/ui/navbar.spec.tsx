import { screen, render } from "@testing-library/react"
import { expect, test } from "vitest"
import { Navbar } from "./navbar"

test('Header', () => {
  render(<Navbar>ClimatePulse</Navbar>)
  expect(screen.getByText("ClimatePulse")).toBeDefined()
})
