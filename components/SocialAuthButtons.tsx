import { signIn } from "@/auth";

export default function SocialAuthButtons({ mode }: { mode: "signin" | "signup" }) {
  const actionLabel = mode === "signup" ? "Sign up" : "Continue";

  return (
    <div className="space-y-3">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold hover:bg-slate-50" type="submit">
          <span aria-hidden="true" className="text-lg font-bold text-blue-600">G</span>
          {actionLabel} with Google
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("apple", { redirectTo: "/" });
        }}
      >
        <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-slate-800" type="submit">
          <span aria-hidden="true" className="text-xl">●</span>
          {actionLabel} with Apple
        </button>
      </form>
    </div>
  );
}
