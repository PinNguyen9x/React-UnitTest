import React from "react";
import { render, screen } from "@testing-library/react";
import User from "./User";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";

describe("User Component", () => {
  // Define the mock handler for this specific test
  const mockUserData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  beforeEach(() => {
    // Add a handler specifically for this test
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users/:userId", () => {
        return HttpResponse.json(mockUserData);
      })
    );
  });

  it("fetches and displays user data", async () => {
    render(<User userId={1} />);

    // Check loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to load and check content
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("handles error state", async () => {
    // Override handler for error case
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users/:userId", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<User userId={1} />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
