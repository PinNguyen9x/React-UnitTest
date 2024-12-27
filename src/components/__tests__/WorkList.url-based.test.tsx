import { render, screen } from "@testing-library/react";
import { WorkList } from "../../WorkList";

describe("WorkList Component with URL-based Mocking", () => {
  const mockWorks = [
    { id: 1, title: "Work 1", authorId: 1 },
    { id: 2, title: "Work 2", authorId: 2 },
  ];

  const mockAuthors = [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup URL-based mock with exact URLs
    global.fetch = jest.fn().mockImplementation((url) => {
      console.log("Fetch called with URL:", url); // Debug log

      // Match exact URLs
      if (url === "api/works") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWorks),
        });
      }
      if (url === "api/authors") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthors),
        });
      }
      return Promise.reject(new Error(`URL not mocked: ${url}`));
    });
  });

  it("fetches and displays works with authors", async () => {
    render(<WorkList />);

    // Wait for data to load
    await screen.findByText(/Work 1/);

    // Verify fetch was called with correct URLs
    expect(global.fetch).toHaveBeenCalledWith("api/works");
    expect(global.fetch).toHaveBeenCalledWith("api/authors");

    // Check works are displayed
    expect(screen.getByText(/Work 1/)).toBeInTheDocument();
    expect(screen.getByText(/Work 2/)).toBeInTheDocument();

    // Check authors are displayed
    expect(screen.getByText(/By: Author 1/)).toBeInTheDocument();
    expect(screen.getByText(/By: Author 2/)).toBeInTheDocument();
  });

  it("handles API error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("API Error"));

    render(<WorkList />);
    expect(await screen.findByText("API Error")).toBeInTheDocument();
  });

  it("handles empty data", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<WorkList />);
    expect(await screen.findByText("No works available")).toBeInTheDocument();
  });

  // Add test to verify URLs
  it("calls correct URLs", async () => {
    render(<WorkList />);

    // Wait for any async operations
    await screen.findByText(/Work 1/);

    // Get all fetch calls
    const calls = (global.fetch as jest.Mock).mock.calls;

    // Log all URLs that were called
    console.log(
      "All URLs called:",
      calls.map((call) => call[0])
    );

    // Verify correct URLs were called
    expect(calls).toContainEqual(["api/works"]);
    expect(calls).toContainEqual(["api/authors"]);
  });
});
