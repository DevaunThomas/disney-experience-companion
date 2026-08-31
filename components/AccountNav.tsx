"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AccountNav() {
  const { status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <nav aria-label="Account" className="flex flex-wrap items-center justify-end gap-2">
      {status === "authenticated" ? (
        <>
          <Link
            href="/profile"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100"
          >
            View profile
          </Link>
          <button
            type="button"
            disabled={isSigningOut}
            onClick={async () => {
              setIsSigningOut(true);
              await signOut({ redirectTo: "/" });
            }}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
          >
            {isSigningOut ? "Logging out…" : "Logout"}
          </button>
        </>
      ) : status === "unauthenticated" ? (
        <>
          <Link
            href="/sign-in"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Sign up
          </Link>
        </>
      ) : (
        <span className="h-10 w-28 animate-pulse rounded-lg bg-slate-200" aria-label="Loading account" />
      )}
    </nav>
  );
}
