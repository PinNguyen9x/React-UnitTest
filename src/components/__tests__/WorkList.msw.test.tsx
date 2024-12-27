import { render, screen } from "@testing-library/react";
import { http, HttpResponse, PathParams } from "msw";
import { WorkList } from "../../WorkList";
import { server } from "../../mocks/server";

// Ensure Response is available
import "whatwg-fetch";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("WorkList Component with MSW", () => {
  it("fetches and displays works with authors", async () => {
    render(<WorkList />);

    // Check works are displayed
    expect(await screen.findByText("Work 1")).toBeInTheDocument();
    expect(await screen.findByText("Work 2")).toBeInTheDocument();

    // Check authors are displayed
    expect(await screen.findByText(/Author 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Author 2/)).toBeInTheDocument();
  });

  it("handles API error", async () => {
    server.use(
      http.get<never, PathParams, any>("/api/works", () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Server Error",
        });
      })
    );

    render(<WorkList />);
    expect(await screen.findByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("handles empty data", async () => {
    server.use(
      http.get<never, PathParams, any>("/api/works", () => {
        return HttpResponse.json([]);
      }),
      http.get("/api/authors", () => {
        return HttpResponse.json([]);
      })
    );

    render(<WorkList />);
    expect(await screen.findByText("No works available")).toBeInTheDocument();
  });

  it("handles network error", async () => {
    server.use(
      http.get<never, PathParams, any>("/api/works", () => {
        return HttpResponse.error();
      })
    );

    render(<WorkList />);
    expect(await screen.findByText(/Failed to fetch/)).toBeInTheDocument();
  });
});
