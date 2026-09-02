"use client";

import { useState } from "react";
import AttractionCard from "@/components/AttractionCard";
import AccountNav from "@/components/AccountNav";
import { attractions } from "@/data/attractions";

type FilterKey = "parks" | "rideTypes" | "heights" | "lands";
type Filters = Record<FilterKey, string[]>;

const emptyFilters: Filters = { parks: [], rideTypes: [], heights: [], lands: [] };

const filterGroups: { key: FilterKey; label: string; options: string[] }[] = [
  {
    key: "parks",
    label: "Parks",
    options: [...new Set(attractions.map((attraction) => attraction.park))],
  },
  {
    key: "rideTypes",
    label: "Attraction types",
    options: [...new Set(attractions.map((attraction) => attraction.rideType))].sort(),
  },
  {
    key: "heights",
    label: "Height requirement",
    options: [
      "No minimum",
      ...[...new Set(
        attractions.flatMap((attraction) =>
          attraction.heightRequirement === undefined ? [] : [attraction.heightRequirement],
        ),
      )]
        .sort((a, b) => a - b)
        .map((height) => `${height} inches`),
    ],
  },
  {
    key: "lands",
    label: "Land",
    options: [...new Set(attractions.map((attraction) => attraction.land))].sort(),
  },
];

export default function AttractionsPage() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const toggleFilter = (group: FilterKey, option: string) => {
    setFilters((current) => ({
      ...current,
      [group]: current[group].includes(option)
        ? current[group].filter((value) => value !== option)
        : [...current[group], option],
    }));
  };

  const filteredAttractions = attractions.filter((attraction) => {
    const height = attraction.heightRequirement === undefined ? "No minimum" : `${attraction.heightRequirement} inches`;

    return (
      attraction.name.toLowerCase().includes(searchText.trim().toLowerCase()) &&
      (filters.parks.length === 0 || filters.parks.includes(attraction.park)) &&
      (filters.rideTypes.length === 0 || filters.rideTypes.includes(attraction.rideType)) &&
      (filters.heights.length === 0 || filters.heights.includes(height)) &&
      (filters.lands.length === 0 || filters.lands.includes(attraction.land))
    );
  });

  const activeFilterCount = Object.values(filters).reduce((total, values) => total + values.length, 0);

  return (
    <main className="min-h-screen bg-white p-4 font-sans text-black sm:p-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div>
          <h1 className="text-3xl font-semibold">Disney Attractions</h1>
          <p className="mt-1 text-sm text-slate-600">Plan your perfect Disneyland Resort adventure.</p>
        </div>
        <AccountNav />
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <a href="/" className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">Home</a>
        <a href="/restaurants" className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">Restaurants</a>
        <a href="/parades" className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">Parades</a>
        <a href="/fireworks" className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">Fireworks</a>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Filters</h2>
            {activeFilterCount > 0 && (
              <button
                className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                type="button"
                onClick={() => setFilters(emptyFilters)}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-5">
            {filterGroups.map((group) => (
              <fieldset key={group.key} className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
                <legend className="mb-2 font-semibold">{group.label}</legend>
                <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {group.options.map((option) => {
                    const id = `${group.key}-${option}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");

                    return (
                      <div key={option} className="flex items-start gap-2">
                        <input
                          id={id}
                          className="mt-0.5 size-4 shrink-0 accent-blue-700"
                          type="checkbox"
                          checked={filters[group.key].includes(option)}
                          onChange={() => toggleFilter(group.key, option)}
                        />
                        <label className="cursor-pointer text-sm leading-5" htmlFor={id}>
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </aside>

        <section aria-labelledby="results-heading">
          <label className="sr-only" htmlFor="attraction-search">Search attractions</label>
          <input
            id="attraction-search"
            className="mb-3 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-black outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            type="search"
            placeholder="Search attractions..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <p id="results-heading" className="mb-4 text-sm text-slate-600" aria-live="polite">
            Showing {filteredAttractions.length} of {attractions.length} attractions
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredAttractions.length > 0 ? (
              filteredAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center md:col-span-2 xl:col-span-3">
                <p className="text-lg font-semibold">No attractions found.</p>
                <p className="mt-1 text-sm text-slate-600">Try removing a filter or changing your search.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
