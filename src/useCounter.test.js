import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useCounter } from "./useCounter";
import React from "react";

test("should increment and decrement the counter value", () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(0);
});
