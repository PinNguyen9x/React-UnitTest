import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "../Navigation";

// Mock useNavigate
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Navigation Component", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it("renders all navigation links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Using data-testid to ensure we're testing the right elements
    expect(screen.getByTestId("home-link")).toBeInTheDocument();
    expect(screen.getByTestId("about-link")).toBeInTheDocument();
    expect(screen.getByTestId("contact-link")).toBeInTheDocument();
  });

  it("navigates to about page when button is clicked", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const aboutButton = screen.getByTestId("about-button");
    fireEvent.click(aboutButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/about");
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  it("has correct href attributes for links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByTestId("home-link")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("about-link")).toHaveAttribute("href", "/about");
    expect(screen.getByTestId("contact-link")).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("applies correct Tailwind classes for styling", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Test for presence of main navigation container classes
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("bg-white", "shadow-lg");

    // Test for button styling
    const button = screen.getByTestId("about-button");
    expect(button).toHaveClass("bg-blue-600", "text-white");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
