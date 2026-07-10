"use server";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { validateSignup } from "@/lib/validation";

export interface SignupState {
  status: "idle" | "success" | "error";
  message: string;
}

export async function submitSignup(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  const result = validateSignup({
    email: String(formData.get("email") ?? ""),
    source: String(formData.get("source") ?? ""),
    honeypot: String(formData.get("company") ?? ""), // honeypot field named "company"
  });

  if (!result.ok) {
    // Honeypot hit: pretend success so bots get no signal.
    if (String(formData.get("company") ?? "").trim() !== "") {
      return { status: "success", message: "Thanks! You're on the list." };
    }
    return { status: "error", message: result.error };
  }

  try {
    await addDoc(collection(db, "signups"), {
      email: result.value.email,
      source: result.value.source,
      createdAt: serverTimestamp(),
    });
    return { status: "success", message: "Thanks! You're on the list." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
