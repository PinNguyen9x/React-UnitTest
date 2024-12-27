import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "./Header";

// Mock the useAuth hook
jest.mock("../../hooks/useAuth");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Header", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    jest.clearAllMocks();
  });

  it("should show sign in button when user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const signInButton = screen.getByText("Sign In");
    expect(signInButton).toBeInTheDocument();
  });

  it("should hide sign in button when user is authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const signInButton = screen.queryByText("Sign In");
    expect(signInButton).not.toBeInTheDocument();
  });

  it("should call onSignInClick when sign in button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/signin");
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});
