"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  generateDefaultPlanName,
  moveExperienceInItinerary,
  readItineraryPlan,
  removeExperienceFromItinerary,
  saveItinerary,
  savePlanMetadata,
  type ItineraryEntry,
} from "@/util/itinerary";

type CategoryKey = "attractions" | "restaurants" | "parades" | "fireworks";

type EditingEntry = {
  category: CategoryKey;
  id: number;
  note: string;
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
  const [planName, setPlanName] = useState("My Magical Day");
  const [planDate, setPlanDate] = useState("");
  const [planNotes, setPlanNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EditingEntry | null>(null);

  useEffect(() => {
    const plan = readItineraryPlan(session?.user?.email ?? null);
    setItinerary(plan.items);
    setPlanName(plan.planName || generateDefaultPlanName(session?.user?.email ?? null));
    setPlanDate(plan.date || "");
    setPlanNotes(plan.notes || "");
    setLoading(false);
  }, [storageKey, session?.user?.email]);

  const removeItem = (category: CategoryKey, id: number) => {
    const next = removeExperienceFromItinerary(category, id, session?.user?.email ?? null);
    setItinerary(next);
    savePlanMetadata(planName, planDate, planNotes, session?.user?.email ?? null);
  };

  const moveItem = (category: CategoryKey, id: number, direction: "up" | "down") => {
    const next = moveExperienceInItinerary(category, id, direction, session?.user?.email ?? null);
    setItinerary(next);
    savePlanMetadata(planName, planDate, planNotes, session?.user?.email ?? null);
  };

  const clearPlan = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(storageKey);
    setItinerary([]);
    setPlanName(generateDefaultPlanName(session?.user?.email ?? null));
    setPlanDate("");
    setPlanNotes("");
  };

  const handlePlanMetaSave = () => {
    savePlanMetadata(planName, planDate, planNotes, session?.user?.email ?? null);
    setIsPlanModalOpen(false);
  };

  const saveEditedEntry = () => {
    if (!editingEntry) return;

    const next = itinerary.map((entry) =>
      entry.category === editingEntry.category && entry.id === editingEntry.id
        ? { ...entry, note: editingEntry.note.trim() }
        : entry,
    );

    setItinerary(next);
    saveItinerary(next, session?.user?.email ?? null, {
      planName,
      date: planDate,
      notes: planNotes,
    });
    setEditingEntry(null);
  };

  const summary = {
    total: itinerary.length,
    attractions: itinerary.filter((entry) => entry.category === "attractions").length,
    restaurants: itinerary.filter((entry) => entry.category === "restaurants").length,
    parades: itinerary.filter((entry) => entry.category === "parades").length,
    fireworks: itinerary.filter((entry) => entry.category === "fireworks").length,
  };

  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">My itinerary</p>
      <h1 className="mt-2 text-3xl font-bold">{planName}</h1>
      <p className="mt-2 text-slate-600">{planDate ? `Plan date: ${planDate}` : "Review, edit, and keep your Disney day organized."}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsPlanModalOpen(true)}
          className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
        >
          Edit plan
        </button>
        <Link href="/planner" className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100">
          Add more
        </Link>
        <Link href="/profile" className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100">
          View profile
        </Link>
        {itinerary.length > 0 && (
          <button
            type="button"
            onClick={clearPlan}
            className="rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-700 hover:bg-red-50"
          >
            Clear plan
          </button>
        )}
      </div>

      {!loading && itinerary.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{summary.total}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Attractions</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{summary.attractions}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Dining</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{summary.restaurants}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Shows</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{summary.parades + summary.fireworks}</p>
          </div>
        </div>
      )}

      {planNotes && (
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Trip notes</p>
          <p className="mt-1 whitespace-pre-line">{planNotes}</p>
        </div>
      )}

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
          {itinerary.map((entry, index) => (
            <div key={`${entry.category}-${entry.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {categoryLabels[entry.category]}
                </p>
                <span className="text-xs text-slate-400">#{index + 1}</span>
              </div>

              <p className="mt-2 text-lg font-semibold text-slate-900">{entry.name}</p>

              {entry.note && (
                <p className="mt-3 whitespace-pre-line rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-slate-700">
                  {entry.note}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEntry({ category: entry.category, id: entry.id, note: entry.note ?? "" })}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Add Note
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(entry.category, entry.id, "up")}
                  disabled={index === 0}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Move up
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(entry.category, entry.id, "down")}
                  disabled={index === itinerary.length - 1}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Move down
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(entry.category, entry.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Edit plan</h2>
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(false)}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                Plan name
                <input
                  type="text"
                  value={planName}
                  onChange={(event) => setPlanName(event.target.value || generateDefaultPlanName(session?.user?.email ?? null))}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Date
                <input
                  type="date"
                  value={planDate}
                  onChange={(event) => setPlanDate(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Trip notes
                <textarea
                  value={planNotes}
                  onChange={(event) => setPlanNotes(event.target.value)}
                  rows={4}
                  placeholder="Example: Arrive by 9:00 AM, dinner reservation at 6:30 PM."
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePlanMetaSave}
                className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Edit item</h2>
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700"
              >
                Close
              </button>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Add a note
              <textarea
                value={editingEntry.note}
                onChange={(event) =>
                  setEditingEntry((current) => (current ? { ...current, note: event.target.value } : current))
                }
                rows={4}
                placeholder="Example: Need to be there before 11:00 AM, bring a poncho, or reserve dinner for 6:30 PM."
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditedEntry}
                className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
              >
                Save note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
