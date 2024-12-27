import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "./SignInForm";
import { useAuth } from "../../hooks/useAuth";

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
});
