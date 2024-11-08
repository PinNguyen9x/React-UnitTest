import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "./Counter";

test("renders the counter component with initial state", () => {
  render(<Counter />);
  const counterText = screen.getByText(/Counter: 0/i);
  expect(counterText).toBeInTheDocument();
});

test("increments the counter value on clicking the increment button", () => {
  render(<Counter />);
  const incrementButton = screen.getByText(/Increment/i);
  fireEvent.click(incrementButton);
  const counterText = screen.getByText(/Counter: 1/i);
  expect(counterText).toBeInTheDocument();
});

test("decrements the counter value on clicking the decrement button", () => {
  render(<Counter />);
  const decrementButton = screen.getByText(/Decrement/i);
  fireEvent.click(decrementButton);
  const counterText = screen.getByText(/Counter: -1/i);
  expect(counterText).toBeInTheDocument();
});
