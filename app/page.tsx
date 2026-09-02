import Link from "next/link";
import { redirect } from "next/navigation";
import AccountNav from "@/components/AccountNav";
import { auth } from "@/auth";

const experienceCategories = [
  {
    title: "Attractions",
    description: "Rides, coasters, and immersive adventures across both parks.",
    href: "/attractions",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/dlr/parks-and-tickets/attractions/disneyland/astro-orbitor/astro-orbitor-00.jpg?1763620850989",
  },
  {
    title: "Restaurants",
    description: "Dining spots for quick bites, character meals, and table service.",
    href: "/restaurants",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/dlr/things-to-do/dining/disneyland/bengal-barbecue/bengal-barbecue-00.jpg?1777472730537",
  },
  {
    title: "Parades",
    description: "Seasonal entertainment and character-filled performances to plan around.",
    href: "/parades",
    image:
      "https://r2-media.wdwnt.com/2022/09/magic-happens-parade-debut-dl_9-1155x770-1.jpg",
  },
  {
    title: "Fireworks",
    description: "Nighttime shows, fireworks, and evenings worth reserving a view for.",
    href: "/fireworks",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/disneyland/entertainment/disneyland/believe-in-holiday-magic-fireworks/holiday-magic-fireworks-16x9.jpg?1784909241131",
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
          Browse attractions, restaurants, parades, and fireworks in one place to shape your magical Disneyland Resort day.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {experienceCategories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className="relative h-36 overflow-hidden bg-slate-200"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.5)), url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex items-end p-4">
                <span className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                  {category.title}
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">{category.description}</p>
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
