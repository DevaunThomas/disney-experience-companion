"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExperiencePage from "@/components/ExperiencePage";
import { restaurants } from "@/data/restaurants";
import { addExperienceToItinerary, readItinerary, removeExperienceFromItinerary } from "@/util/itinerary";

const filters = [
  { key: "park", label: "Parks", options: [...new Set(restaurants.map((restaurant) => restaurant.park))].filter((value): value is string => typeof value === "string") },
  { key: "type", label: "Dining style", options: [...new Set(restaurants.map((restaurant) => restaurant.type))].filter((value): value is string => typeof value === "string") },
  { key: "land", label: "Land", options: [...new Set(restaurants.map((restaurant) => restaurant.land))].filter((value): value is string => typeof value === "string") },
  { key: "status", label: "Status", options: [...new Set(restaurants.map((restaurant) => restaurant.status))].filter((value): value is string => typeof value === "string") },
];

export default function RestaurantsPage() {
  return (
    <ExperiencePage
      title="Disney Restaurants"
      subtitle="Find quick bites, character dining, and table-service favorites for your trip."
      items={restaurants}
      filters={filters}
      searchPlaceholder="Search restaurants..."
      resultText={(count, total) => `Showing ${count} of ${total} restaurants`}
      emptyStateTitle="No restaurants found."
      emptyStateDescription="Try removing a filter or changing your search."
      renderCard={(restaurant) => {
        const RestaurantCardAction = () => {
          const { data: session } = useSession();
          const [isAdded, setIsAdded] = useState(false);
          const [showToast, setShowToast] = useState(false);
          const email = session?.user?.email ?? null;

          useEffect(() => {
            setIsAdded(readItinerary(email).some((entry) => entry.category === "restaurants" && entry.id === restaurant.id));
          }, [email]);

          const toggleItinerary = () => {
            if (isAdded) {
              removeExperienceFromItinerary("restaurants", restaurant.id, email);
            } else {
              addExperienceToItinerary("restaurants", restaurant.id, restaurant.name, email);
            }
            setIsAdded((current) => !current);
            setShowToast(true);
            window.setTimeout(() => setShowToast(false), 1500);
          };

          return (
            <>
              {showToast && (
                <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center">
                  <div className={`rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg ${isAdded ? "bg-emerald-600" : "bg-red-600"}`}>
                    {isAdded ? "Added to Itinerary" : "Removed from Itinerary"}
                  </div>
                </div>
              )}

              <article className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{restaurant.name}</h2>
                  <p className="text-sm text-slate-600">{restaurant.park}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    restaurant.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {restaurant.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p><span className="font-semibold">Location:</span> {restaurant.land}</p>
                <p><span className="font-semibold">Dining style:</span> {restaurant.type}</p>
                <p><span className="font-semibold">Cuisine:</span> {restaurant.cuisine}</p>
                <p><span className="font-semibold">Wait:</span> {restaurant.waitTime} minutes</p>
                <p className="pt-2 text-slate-600">{restaurant.description}</p>
              </div>

                <button
                  type="button"
                  title={isAdded ? "Remove from itinerary" : "Add to itinerary"}
                  onClick={toggleItinerary}
                  className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 ${isAdded ? "bg-red-600 hover:bg-red-700" : "bg-blue-700 hover:bg-blue-800"}`}
                >
                  {isAdded ? "-" : "+"}
                </button>
              </article>
            </>
          );
        };

        return <RestaurantCardAction />;
      }}
    />
  );
}
