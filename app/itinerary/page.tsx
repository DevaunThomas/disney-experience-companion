import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AccountNav from "@/components/AccountNav";
import ItineraryViewer from "@/components/ItineraryViewer";

export default async function ItineraryPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/itinerary");

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 sm:p-6">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-lg font-bold text-blue-800">Disney Experience Companion</Link>
        </div>
        <AccountNav />
      </header>

      <ItineraryViewer />
    </main>
  );
}
