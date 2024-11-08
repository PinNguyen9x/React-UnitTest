import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

test("Button snapshot", () => {
  const { asFragment } = render(<Button label="Click Me" />);
  expect(asFragment()).toMatchSnapshot();
});
