"use client";

import { useActionState } from "react";
import { credentialsSignIn, credentialsSignUp } from "@/app/actions/auth-actions";

const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function CredentialsAuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const [state, action, pending] = useActionState(isSignup ? credentialsSignUp : credentialsSignIn, undefined);

  return (
    <form action={action} className="space-y-4">
      {isSignup && (
        <div>
          <label htmlFor="name" className="text-sm font-semibold">Username</label>
          <input id="name" name="name" autoComplete="username" minLength={2} required className={inputClass} placeholder="Your display name" />
        </div>
      )}
      <div>
        <label htmlFor="email" className="text-sm font-semibold">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold">Password</label>
        <input id="password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={8} required className={inputClass} />
        {isSignup && <p className="mt-1 text-xs text-slate-500">At least 8 characters with a letter and number.</p>}
      </div>
      {state?.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{state.error}</p>}
      <button disabled={pending} type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60">
        {pending ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}
