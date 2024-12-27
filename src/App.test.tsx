import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const renderWithRouter = (initialEntry = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>
  );
};

describe("App Component", () => {
  it("renders the home page by default", () => {
    renderWithRouter();
    expect(screen.getByText("Work List App")).toBeInTheDocument();
  });

  it("renders about page on /about route", () => {
    renderWithRouter("/about");
    expect(screen.getByText("About Page")).toBeInTheDocument();
  });

  it("renders navigation component", () => {
    renderWithRouter();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderWithRouter();
    expect(container).toMatchSnapshot();
  });
});
