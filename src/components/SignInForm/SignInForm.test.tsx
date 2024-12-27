import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "./SignInForm";
import { useAuth } from "../../hooks/useAuth";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useAuth");

describe("SignInForm", () => {
  const mockOnClose = jest.fn();
  const mockSignIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ signIn: mockSignIn });
  });

  it("should handle form submission correctly", async () => {
    render(<SignInForm onClose={mockOnClose} />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("should close form when cancel button is clicked", () => {
    render(<SignInForm onClose={mockOnClose} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders form elements correctly", () => {
    render(<SignInForm onClose={mockOnClose} />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(<SignInForm onClose={mockOnClose} />);

    const submitButton = screen.getByTestId("submit-button");
    await userEvent.click(submitButton);

    // Test email validation
    const emailError = await screen.findByText("Email is required");
    expect(emailError).toBeInTheDocument();

    // Test password validation
    const passwordError = await screen.findByText("Password is required");
    expect(passwordError).toBeInTheDocument();
  });

  it("submits form with valid data successfully", async () => {
    mockSignIn.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    render(<SignInForm onClose={mockOnClose} />);

    await userEvent.type(screen.getByTestId("email-input"), "test@example.com");
    await userEvent.type(screen.getByTestId("password-input"), "password123");

    const submitButton = screen.getByTestId("submit-button");
    await userEvent.click(submitButton);

    // Wait for button to be disabled
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("closes form when cancel button is clicked", async () => {
    render(<SignInForm onClose={mockOnClose} />);

    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
