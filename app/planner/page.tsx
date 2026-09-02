import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AccountNav from "@/components/AccountNav";
import PlanWizard from "@/components/PlanWizard";

export default async function PlannerPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/planner");

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 sm:p-6">
      <header className="mx-auto mb-8 flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">Planning flow</p>
          <h1 className="mt-1 text-3xl font-bold">Craft your magical day</h1>
        </div>
        <AccountNav />
      </header>

      <PlanWizard />
    </main>
  );
}
