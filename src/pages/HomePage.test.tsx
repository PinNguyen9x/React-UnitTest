import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import { useAuth } from "../hooks/useAuth";

jest.mock("react-router-dom");
jest.mock("../hooks/useAuth");

describe("HomePage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("should show sign in form when sign in button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(<HomePage />);

    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);

    // Use data-testid to uniquely identify the sign in form heading
    expect(screen.getByText("SignIn Form")).toBeInTheDocument();
  });

  it("should redirect to user page when authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(<HomePage />);

    expect(mockNavigate).toHaveBeenCalledWith("/user");
  });
});
