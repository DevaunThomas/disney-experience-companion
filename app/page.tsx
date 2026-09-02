import Link from "next/link";
import { redirect } from "next/navigation";
import AccountNav from "@/components/AccountNav";
import { auth } from "@/auth";

const experienceCategories = [
  {
    title: "Attractions",
    description: "Rides, coasters, and immersive adventures across both parks.",
    href: "/attractions",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    title: "Restaurants",
    description: "Dining spots for quick bites, character meals, and table service.",
    href: "/restaurants",
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Parades",
    description: "Seasonal entertainment and character-filled performances to plan around.",
    href: "/parades",
    accent: "from-purple-600 to-pink-500",
  },
  {
    title: "Fireworks",
    description: "Nighttime shows, fireworks, and evenings worth reserving a view for.",
    href: "/fireworks",
    accent: "from-red-500 to-pink-600",
  },
];

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">Disney planner</p>
            <h1 className="mt-2 text-3xl font-bold">Disney Experience Companion</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/planner"
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Start Planning Your Magical Day
            </Link>
            <AccountNav />
          </div>
        </div>
      </header>

      <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">Plan your day</p>
        <h2 className="mt-3 text-4xl font-bold">Build a park day around the experiences you care about.</h2>
        <p className="mt-4 max-w-2xl text-base text-blue-50">
          Browse attractions, restaurants, parades, and fireworks in one place to shape your ideal Disneyland Resort plan.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {experienceCategories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`h-28 bg-gradient-to-r ${category.accent}`} />
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                Open {category.title}
                <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
