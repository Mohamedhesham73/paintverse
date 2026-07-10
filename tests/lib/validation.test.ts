// @vitest-environment node
import { describe, it, expect } from "vitest";
import { validateSignup } from "@/lib/validation";

describe("validateSignup", () => {
  it("accepts a valid email + known source", () => {
    const r = validateSignup({ email: "a@b.com", source: "newsletter", honeypot: "" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.email).toBe("a@b.com");
  });
  it("lowercases and trims email", () => {
    const r = validateSignup({ email: "  A@B.COM ", source: "newsletter", honeypot: "" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.email).toBe("a@b.com");
  });
  it("rejects invalid email", () => {
    const r = validateSignup({ email: "nope", source: "newsletter", honeypot: "" });
    expect(r.ok).toBe(false);
  });
  it("rejects unknown source", () => {
    const r = validateSignup({ email: "a@b.com", source: "hacker", honeypot: "" });
    expect(r.ok).toBe(false);
  });
  it("rejects when honeypot is filled (bot)", () => {
    const r = validateSignup({ email: "a@b.com", source: "newsletter", honeypot: "x" });
    expect(r.ok).toBe(false);
  });
});
