import { render, screen } from "@testing-library/react";
import Async from "./Async";
describe("test suite for Async component it is named Async", () => {
  test("testing the fetch is ok", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => {
        return [{ id: "p1", title: "First post" }];
      },
    });
    render(<Async />);
    const listitems = await screen.findAllByRole(
      "listitem",
      {},
      { timeout: 1000 }
    );
    expect(listitems).not.toHaveLength(0);
  });
});
