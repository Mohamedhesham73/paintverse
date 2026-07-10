export const SIGNUP_SOURCES = ["newsletter", "waitlist:mecha-chameleon"] as const;
export type SignupSource = (typeof SIGNUP_SOURCES)[number];

export interface SignupInput {
  email: string;
  source: string;
  honeypot: string;
}

export interface ValidSignup {
  email: string;
  source: SignupSource;
}

export type ValidationResult =
  | { ok: true; value: ValidSignup }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignup(input: SignupInput): ValidationResult {
  if (input.honeypot && input.honeypot.trim() !== "") {
    return { ok: false, error: "Rejected." };
  }
  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!SIGNUP_SOURCES.includes(input.source as SignupSource)) {
    return { ok: false, error: "Invalid signup source." };
  }
  return { ok: true, value: { email, source: input.source as SignupSource } };
}
