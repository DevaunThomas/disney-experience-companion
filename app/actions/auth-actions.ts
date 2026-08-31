"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { createUser } from "@/util/user-store";

export type AuthFormState = { error?: string } | undefined;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function credentialsSignIn(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email address and password." };

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) return { error: "The email address or password is incorrect." };
    throw error;
  }
}

export async function credentialsSignUp(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { error: "Your username must be at least 2 characters." };
  if (!emailPattern.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { error: "Use at least 8 characters, including a letter and a number." };
  }

  const result = await createUser(name, email, password);
  if ("error" in result) return { error: result.error };

  await signIn("credentials", { email, password, redirectTo: "/" });
}
