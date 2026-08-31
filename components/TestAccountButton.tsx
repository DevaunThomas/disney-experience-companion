"use client";

import { useActionState } from "react";
import { credentialsSignIn } from "@/app/actions/auth-actions";

export default function TestAccountButton() {
  const [state, action, pending] = useActionState(credentialsSignIn, undefined);

  return (
    <form action={action} className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
      <input type="hidden" name="email" value="test@disneycompanion.local" />
      <input type="hidden" name="password" value="Disney123!" />
      <p className="text-sm font-semibold text-amber-950">Development test account</p>
      <p className="mt-1 text-xs text-amber-900">test@disneycompanion.local / Disney123!</p>
      <button disabled={pending} type="submit" className="mt-3 w-full rounded-lg border border-amber-400 bg-white px-3 py-2 text-sm font-semibold hover:bg-amber-100 disabled:opacity-60">
        {pending ? "Signing in…" : "Continue with test account"}
      </button>
      {state?.error && <p className="mt-2 text-xs text-red-700" role="alert">{state.error}</p>}
    </form>
  );
}
