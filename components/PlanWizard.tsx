"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { generateDefaultPlanName, readItinerary, saveItinerary } from "@/util/itinerary";

type CategoryKey = "attractions" | "restaurants" | "parades" | "fireworks";

type PlannerEntry = {
  category: CategoryKey;
  name: string;
  id: number;
};

const categoryRoutes: Record<CategoryKey, string> = {
  attractions: "/attractions",
  restaurants: "/restaurants",
  parades: "/parades",
  fireworks: "/fireworks",
};

const categoryLabels: Record<CategoryKey, string> = {
  attractions: "Attractions",
  restaurants: "Restaurants",
  parades: "Parades",
  fireworks: "Fireworks",
};

const categoryOrder: CategoryKey[] = ["attractions", "restaurants", "parades", "fireworks"];

export default function PlanWizard() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("attractions");
  const [itinerary, setItinerary] = useState<PlannerEntry[]>([]);
  const [saveMessage, setSaveMessage] = useState("");

  const storageKey = useMemo(
    () => (session?.user?.email ? `disney-itinerary:${session.user.email}` : "disney-itinerary:guest"),
    [session?.user?.email],
  );

  useEffect(() => {
    const loaded = readItinerary(session?.user?.email ?? null).filter(
      (entry): entry is PlannerEntry =>
        categoryOrder.includes(entry.category as CategoryKey) && typeof entry.id === "number" && typeof entry.name === "string",
    );

    setItinerary(loaded);
  }, [storageKey, session?.user?.email]);

  const goToCategoryPage = () => {
    window.location.assign(categoryRoutes[selectedCategory]);
  };

  const savePlan = () => {
    if (!session?.user?.email) return;

    try {
      saveItinerary(itinerary, session.user.email, {
        planName: generateDefaultPlanName(session.user.email),
        date: new Date().toISOString().slice(0, 10),
        notes: "",
      });
      setSaveMessage("Your itinerary has been saved and is ready to view.");
      window.location.assign("/itinerary");
    } catch {
      setSaveMessage("Something went wrong while saving your itinerary.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">Itinerary planner</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Which experience would you like to start planning first?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Choose a category, then we’ll take you to the matching experience page so you can browse the details and add the perfect moments to your day.
        </p>

        <div className="mt-6 max-w-md">
          <label className="block text-sm font-semibold text-slate-700">
            Category
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-black outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value as CategoryKey)}
            >
              {categoryOrder.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={goToCategoryPage}
            className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Open {categoryLabels[selectedCategory]} page
          </button>
          <Link
            href="/itinerary"
            className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            View itinerary
          </Link>
        </div>

        {saveMessage && (
          <p className="mt-4 text-sm font-medium text-green-700" role="status">
            {saveMessage}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-bold text-slate-900">Your magical day so far</h3>
          <button
            type="button"
            disabled={itinerary.length === 0}
            onClick={savePlan}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Save itinerary & view it
          </button>
        </div>

        {itinerary.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            No experiences selected yet. Choose a category above and add your first landmark to the plan.
          </p>
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {itinerary.map((entry) => (
              <div key={`${entry.category}-${entry.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {categoryLabels[entry.category]}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{entry.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
