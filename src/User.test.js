import React from "react";
import { render, screen } from "@testing-library/react";
import User from "./User";

// Mock the API call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      }),
  })
);

test("fetches and displays user data", async () => {
  render(<User userId={1} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
  expect(await screen.findByText(/john.doe@example.com/i)).toBeInTheDocument();

  // Ensure the fetch function was called with the correct URL
  expect(fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/users/1"
  );
});
