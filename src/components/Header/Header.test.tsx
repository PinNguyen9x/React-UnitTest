import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { useAuth } from "../../hooks/useAuth";

// Mock the useAuth hook
jest.mock("../../hooks/useAuth");

describe("Header", () => {
  const mockOnSignInClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show sign in button when user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(<Header onSignInClick={mockOnSignInClick} />);

    const signInButton = screen.getByText("Sign In");
    expect(signInButton).toBeInTheDocument();
  });

  it("should hide sign in button when user is authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(<Header onSignInClick={mockOnSignInClick} />);

    const signInButton = screen.queryByText("Sign In");
    expect(signInButton).not.toBeInTheDocument();
  });

  it("should call onSignInClick when sign in button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(<Header onSignInClick={mockOnSignInClick} />);

    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);
    expect(mockOnSignInClick).toHaveBeenCalledTimes(1);
  });
});
