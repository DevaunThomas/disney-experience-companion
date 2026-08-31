import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AccountNav from "@/components/AccountNav";
import ProfileEditor from "@/components/ProfileEditor";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/profile");

  const accountId = session.user.email ?? session.user.name ?? "signed-in-user";

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-black sm:p-6">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-blue-800">Disney Experience Companion</Link>
        <AccountNav />
      </header>
      <div className="mx-auto mt-10 max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Account</p>
        <h1 className="mt-1 text-3xl font-bold">Your profile</h1>
        <p className="mb-7 mt-2 text-slate-600">Update how the companion personalizes your Disney experience.</p>
        <ProfileEditor
          accountId={accountId}
          initialName={session.user.name ?? "Disney Guest"}
          initialAvatar={session.user.image ?? ""}
        />
      </div>
    </main>
  );
}
