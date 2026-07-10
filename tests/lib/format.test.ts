// @vitest-environment node
import { describe, it, expect } from "vitest";
import { formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats EGP whole numbers without decimals", () => {
    expect(formatPrice(250)).toBe("EGP 250");
  });
  it("adds thousands separators", () => {
    expect(formatPrice(1250)).toBe("EGP 1,250");
  });
  it("handles zero", () => {
    expect(formatPrice(0)).toBe("EGP 0");
  });
});
