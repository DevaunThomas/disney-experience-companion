import Link from "next/link";
import AccountNav from "./AccountNav";
import CredentialsAuthForm from "./CredentialsAuthForm";
import SocialAuthButtons from "./SocialAuthButtons";
import TestAccountButton from "./TestAccountButton";

export default function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-black sm:p-6">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-blue-800">Disney Experience Companion</Link>
        <AccountNav />
      </header>
      <section className="mx-auto mt-16 max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Your Disney day, personalized</p>
        <h1 className="mt-2 text-3xl font-bold">{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-slate-600">
          {isSignup
            ? "Choose your own username, email, and password, or use Google or Apple."
            : "Sign in to view your profile, preferences, and favorite attractions."}
        </p>
        <CredentialsAuthForm mode={mode} />
        {!isSignup && process.env.NODE_ENV !== "production" && <TestAccountButton />}
        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold uppercase text-slate-500">or</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <SocialAuthButtons mode={mode} />
        <p className="mt-6 text-center text-sm text-slate-600">
          {isSignup ? "Already have an account?" : "New to the companion?"}{" "}
          <Link className="font-semibold text-blue-700 hover:underline" href={isSignup ? "/sign-in" : "/sign-up"}>
            {isSignup ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </section>
    </main>
  );
}
