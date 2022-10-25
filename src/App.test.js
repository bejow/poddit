import { render, screen } from "@testing-library/react"
import App from "./App"

test("Renders App without Error", () => {
  render(<App />)
  expect(true).toBe(true)
})
