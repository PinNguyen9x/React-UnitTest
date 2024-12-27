import { render, screen } from "@testing-library/react";
import { WorkList } from "./WorkList";

describe("WorkList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays user data", async () => {
    const mockWorks = [
      { id: 1, title: "Work 1", authorId: 1 },
      { id: 2, title: "Work 2", authorId: 2 },
    ];

    const mockAuthors = [
      { id: 1, name: "Author 1" },
      { id: 2, name: "Author 2" },
    ];

    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWorks),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthors),
        })
      );

    render(<WorkList />);

    // Wait for titles to appear
    const work1Title = await screen.findByText("Work 1");
    const work2Title = await screen.findByText("Work 2");

    // Check titles are rendered
    expect(work1Title).toBeInTheDocument();
    expect(work2Title).toBeInTheDocument();

    // Check author information
    expect(screen.getByText(/By: Author 1/)).toBeInTheDocument();
    expect(screen.getByText(/By: Author 2/)).toBeInTheDocument();

    // Test the structure
    const workElements = screen.getAllByRole("heading", { level: 3 });
    expect(workElements).toHaveLength(2);
    expect(workElements[0]).toHaveTextContent("Work 1");
    expect(workElements[1]).toHaveTextContent("Work 2");
  });

  it("handles fetch error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<WorkList />);
    expect(await screen.findByText("Failed to fetch")).toBeInTheDocument();
  });

  it("handles empty data", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      );

    render(<WorkList />);
    expect(await screen.findByText("No works available")).toBeInTheDocument();
  });
});
