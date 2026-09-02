"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import ExperiencePage from "@/components/ExperiencePage";
import { fireworks } from "@/data/fireworks";
import { addExperienceToItinerary } from "@/util/itinerary";

const filters = [
  { key: "park", label: "Parks", options: [...new Set(fireworks.map((show) => show.park))].filter((value): value is string => typeof value === "string") },
  { key: "type", label: "Experience type", options: [...new Set(fireworks.map((show) => show.type))].filter((value): value is string => typeof value === "string") },
  { key: "land", label: "Land", options: [...new Set(fireworks.map((show) => show.land))].filter((value): value is string => typeof value === "string") },
  { key: "status", label: "Status", options: [...new Set(fireworks.map((show) => show.status))].filter((value): value is string => typeof value === "string") },
];

export default function FireworksPage() {
  return (
    <ExperiencePage
      title="Disney Fireworks & Night Shows"
      subtitle="Plan your evening entertainment with a view-ready guide to the most memorable shows."
      items={fireworks}
      filters={filters}
      searchPlaceholder="Search fireworks..."
      resultText={(count, total) => `Showing ${count} of ${total} shows`}
      emptyStateTitle="No shows found."
      emptyStateDescription="Try removing a filter or changing your search."
      renderCard={(show) => {
        const FireworkCardAction = () => {
          const { data: session } = useSession();
          const [isAdded, setIsAdded] = useState(false);
          const [showToast, setShowToast] = useState(false);

          return (
            <>
              {showToast && (
                <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center">
                  <div className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    Added to Itinerary
                  </div>
                </div>
              )}

              <article className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{show.name}</h2>
                  <p className="text-sm text-slate-600">{show.park}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    show.status === "Open" || show.status === "Scheduled" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {show.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p><span className="font-semibold">Type:</span> {show.type}</p>
                <p><span className="font-semibold">Location:</span> {show.land}</p>
                <p><span className="font-semibold">Showtime:</span> {show.showtime}</p>
                <p><span className="font-semibold">Best view:</span> {show.viewLocation}</p>
                <p><span className="font-semibold">Wait:</span> {show.waitTime} minutes</p>
                <p className="pt-2 text-slate-600">{show.description}</p>
              </div>

                <button
                  type="button"
                  title="Add to itinerary"
                  onClick={() => {
                    addExperienceToItinerary("fireworks", show.id, show.name, session?.user?.email ?? null);
                    setIsAdded(true);
                    setShowToast(true);
                    window.setTimeout(() => {
                      setIsAdded(false);
                      setShowToast(false);
                    }, 1500);
                  }}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-800"
                >
                  {isAdded ? "✓" : "+"}
                </button>
              </article>
            </>
          );
        };

        return <FireworkCardAction />;
      }}
    />
  );
}
