import { render, screen } from "@testing-library/react";
import App from "./App";

describe("test suite for app componetn", () => {
  test("should have learn react", () => {
    render(<App />);
    const el = screen.getByText("Learn React");
    expect(el).toBeInTheDocument();
  });
});
