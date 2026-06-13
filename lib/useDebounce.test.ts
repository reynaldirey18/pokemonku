import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 400));
    expect(result.current).toBe("hello");
  });

  it("does not update value before delay", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 400), {
      initialProps: { val: "a" },
    });

    rerender({ val: "ab" });
    expect(result.current).toBe("a");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 400), {
      initialProps: { val: "a" },
    });

    rerender({ val: "ab" });
    act(() => vi.advanceTimersByTime(400));
    expect(result.current).toBe("ab");
  });

  it("only takes the last value when changed rapidly", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 400), {
      initialProps: { val: "" },
    });

    rerender({ val: "p" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ val: "pi" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ val: "pik" });
    act(() => vi.advanceTimersByTime(400));

    expect(result.current).toBe("pik");
  });

  it("uses 400ms as default delay", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val), {
      initialProps: { val: "x" },
    });

    rerender({ val: "y" });
    act(() => vi.advanceTimersByTime(399));
    expect(result.current).toBe("x");

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("y");
  });
});
