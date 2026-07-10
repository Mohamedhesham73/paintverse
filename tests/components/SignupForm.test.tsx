// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignupForm } from "@/components/forms/SignupForm";

// The action is a server action; mock it for the client render.
vi.mock("@/app/actions/signup", () => ({
  submitSignup: vi.fn(async () => ({ status: "idle", message: "" })),
}));

describe("SignupForm", () => {
  it("renders an email input and the hidden source + honeypot fields", () => {
    const { container } = render(<SignupForm source="newsletter" />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    const source = container.querySelector('input[name="source"]') as HTMLInputElement;
    expect(source.value).toBe("newsletter");
    const honeypot = container.querySelector('input[name="company"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveClass("sr-only");
  });

  it("passes the given source through", () => {
    const { container } = render(<SignupForm source="waitlist:mecha-chameleon" />);
    const source = container.querySelector('input[name="source"]') as HTMLInputElement;
    expect(source.value).toBe("waitlist:mecha-chameleon");
  });
});
