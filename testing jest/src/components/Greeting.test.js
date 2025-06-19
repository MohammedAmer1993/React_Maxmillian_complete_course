import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";
describe("test suite for the greeting component", () => {
  test("should have hello", () => {
    render(<Greeting />);
    const el = screen.getByText("hello", { exact: false });
    expect(el).toBeInTheDocument();
  });

  test("render the not clicked yet", () => {
    render(<Greeting />);

    const paragEle = screen.getByText("NOT clicked yet");
    expect(paragEle).toBeInTheDocument();
  });

  test("renderds text when button is clicked", () => {
    render(<Greeting />);
    const btn = screen.getByRole("button");
    userEvent.click(btn);
    const paragraphEl = screen.getByText("You have already clicked the button");
    expect(paragraphEl).toBeInTheDocument();
  });

  test("doesn't render the frist paragraph when clicking the button", () => {
    render(<Greeting />);
    const btn = screen.getByRole("button");
    userEvent.click(btn);
    // const tmp = screen.getByText("NOT clicked yet");
    const pargNotExistEl = screen.queryByText("NOT clicked yet");
    expect(pargNotExistEl).toBeNull();
  });
});
