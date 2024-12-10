import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import WorkList from "./WorkList";

// Mock the fetch function
const mockWorks = [
  {
    id: "fd08ab72-886a-4861-aea9-ac65ca26cf14",
    title: "Practical Micro Frontends",
    author: "Pin Nguyen",
    description: "This post explores how to implement micro frontends...",
    publishedDate: "2024-06-15T03:00:00Z",
    tagList: ["Design", "Pattern"],
  },
];

const mockAuthors = [
  {
    id: "fd08ab72-886a-4861-aea9-ac65ca26cf14",
    name: "Pin Nguyen",
  },
];

describe("WorkList", () => {
  beforeEach(() => {
    // Initialize fetch mock with a default implementation
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show loading state initially", () => {
    render(<WorkList />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should render works when fetch is successful", async () => {
    // Mock successful fetch with proper response structure
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWorks),
      })
    );

    render(<WorkList />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    // Check if works are rendered
    const workItems = screen.getAllByTestId("work-item");
    expect(workItems).toHaveLength(mockWorks.length);

    // Check content of first work
    expect(screen.getByText(mockWorks[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(`Author: ${mockWorks[0].author}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockWorks[0].description)).toBeInTheDocument();

    // Check if tags are rendered
    mockWorks[0].tagList.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("should show error message when fetch fails", async () => {
    // Mock failed fetch
    const errorMessage = "Failed to fetch works";
    global.fetch = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    render(<WorkList />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should handle non-ok response", async () => {
    // Mock non-ok response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    render(<WorkList />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });
});

describe("WorkList with multiple API calls", () => {
  beforeEach(() => {
    // Mock the first API call for works
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorks,
      })
      // Mock the second API call for authors
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockAuthors,
      });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render works and authors when both fetches are successful", async () => {
    render(<WorkList />);

    // Wait for both fetches to complete
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    // Check if works are rendered
    const workItems = screen.getAllByTestId("work-item");
    expect(workItems).toHaveLength(mockWorks.length);

    // Check if authors are rendered
    const authorItems = screen.getAllByTestId("author-item");
    expect(authorItems).toHaveLength(mockAuthors.length);
  });
});
