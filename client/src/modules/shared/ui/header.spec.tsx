import { screen, render } from "@testing-library/react"
import { expect, test } from "vitest"
import { Header } from "./header"

test('Header', () => {
  render(<Header>Hello World</Header>)
  expect(screen.getByText("Hello World")).toBeDefined()
})
