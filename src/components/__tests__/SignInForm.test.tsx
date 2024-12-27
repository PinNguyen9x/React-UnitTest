import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInForm from "../SignInForm/SignInForm";
import { AuthProvider } from "../../hooks/useAuth";

describe("SignInForm", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders form elements correctly", () => {
    render(
      <AuthProvider
        value={{
          isAuthenticated: false,
          signIn: jest.fn(),
          signOut: jest.fn(),
        }}
      >
        <SignInForm onClose={mockOnClose} />
      </AuthProvider>
    );

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(
      <AuthProvider>
        <SignInForm onClose={mockOnClose} />
      </AuthProvider>
    );

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
    render(
      <AuthProvider>
        <SignInForm onClose={mockOnClose} />
      </AuthProvider>
    );

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Submit form
    await userEvent.click(submitButton);

    // Check if button is disabled during submission
    expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Verify onClose was called after successful submission
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("closes form when cancel button is clicked", async () => {
    render(
      <AuthProvider>
        <SignInForm onClose={mockOnClose} />
      </AuthProvider>
    );

    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
