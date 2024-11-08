import React from "react";
import { render, screen } from "./test-utils";
import MyComponent from "./MyComponent";

test("renders the button with the correct color from theme", () => {
  // Render MyComponent
  render(<MyComponent />);

  // Tìm button trong component
  const button = screen.getByText(/click me/i);

  // Kiểm tra xem button có màu nền đúng từ theme không
  expect(button).toHaveStyle(`background-color: #007bff`);
});
