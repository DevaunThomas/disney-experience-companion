"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type CategoryKey = "attractions" | "restaurants" | "parades" | "fireworks";

type ItineraryEntry = {
  category: CategoryKey;
  name: string;
  id: number;
};

const categoryLabels: Record<CategoryKey, string> = {
  attractions: "Attractions",
  restaurants: "Restaurants",
  parades: "Parades",
  fireworks: "Fireworks",
};

export default function ItineraryViewer() {
  const { data: session } = useSession();
  const storageKey = useMemo(
    () => (session?.user?.email ? `disney-itinerary:${session.user.email}` : "disney-itinerary:guest"),
    [session?.user?.email],
  );

  const [itinerary, setItinerary] = useState<ItineraryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const parsed = raw ? (JSON.parse(raw) as ItineraryEntry[]) : [];
      setItinerary(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItinerary([]);
    } finally {
      setLoading(false);
    }
  }, [storageKey]);

  const removeItem = (category: CategoryKey, id: number) => {
    const next = itinerary.filter((entry) => !(entry.category === category && entry.id === id));
    setItinerary(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">My itinerary</p>
      <h1 className="mt-2 text-3xl font-bold">Your magical day plan</h1>
      <p className="mt-2 text-slate-600">Review, edit, and keep your Disney day organized.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/planner" className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800">
          Edit itinerary
        </Link>
        <Link href="/profile" className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100">
          View profile
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading itinerary…</p>
      ) : itinerary.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-lg font-semibold text-slate-900">No itinerary saved yet.</p>
          <p className="mt-2 text-sm text-slate-600">
            Start planning from the home page to build your first magical day.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {itinerary.map((entry) => (
            <div key={`${entry.category}-${entry.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {categoryLabels[entry.category]}
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{entry.name}</p>
              <button
                type="button"
                onClick={() => removeItem(entry.category, entry.id)}
                className="mt-4 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
