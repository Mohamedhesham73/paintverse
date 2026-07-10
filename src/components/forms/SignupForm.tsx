"use client";

import { useActionState } from "react";
import { submitSignup, type SignupState } from "@/app/actions/signup";
import type { SignupSource } from "@/lib/validation";

const initial: SignupState = { status: "idle", message: "" };

export function SignupForm({ source, compact = false }: { source: SignupSource; compact?: boolean }) {
  const [state, formAction, pending] = useActionState(submitSignup, initial);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="source" value={source} />
      {/* Honeypot: hidden from humans, tempting to bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <div className={compact ? "flex gap-2" : "flex flex-col gap-3 sm:flex-row"}>
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          aria-label="Email address"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-purple"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "…" : "Notify me"}
        </button>
      </div>
      {state.status !== "idle" && (
        <p className={`mt-2 text-sm ${state.status === "success" ? "text-purple-300" : "text-red-400"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
