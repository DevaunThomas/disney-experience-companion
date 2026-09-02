"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import AccountNav from "./AccountNav";

export type ExperienceItem = {
  id: number;
  name: string;
  park: string;
  land?: string;
  status?: string;
  waitTime?: number;
  rideType?: string;
  type?: string;
  heightRequirement?: number;
  image?: string;
  description?: string;
  [key: string]: string | number | undefined;
};

export type ExperienceFilterGroup = {
  key: string;
  label: string;
  options: string[];
};

type ExperiencePageProps<T extends ExperienceItem> = {
  title: string;
  subtitle: string;
  items: T[];
  filters?: ExperienceFilterGroup[];
  searchPlaceholder: string;
  renderCard: (item: T) => ReactNode;
  emptyStateTitle: string;
  emptyStateDescription: string;
  resultText?: (count: number, total: number) => string;
};

const buildDefaultFilterGroups = <T extends ExperienceItem>(items: T[]) => {
  const groups: ExperienceFilterGroup[] = [];

  const parks = [...new Set(items.map((item) => item.park).filter(Boolean))] as string[];
  if (parks.length > 0) {
    groups.push({ key: "park", label: "Parks", options: parks });
  }

  const lands = [...new Set(items.map((item) => item.land).filter(Boolean))] as string[];
  if (lands.length > 0) {
    groups.push({ key: "land", label: "Land", options: lands });
  }

  const statuses = [...new Set(items.map((item) => item.status).filter(Boolean))] as string[];
  if (statuses.length > 0) {
    groups.push({ key: "status", label: "Status", options: statuses });
  }

  const types = [...new Set(items.map((item) => item.rideType ?? item.type).filter(Boolean))] as string[];
  if (types.length > 0) {
    groups.push({ key: "rideType", label: "Experience type", options: types });
  }

  return groups;
};

export default function ExperiencePage<T extends ExperienceItem>({
  title,
  subtitle,
  items,
  filters,
  searchPlaceholder,
  renderCard,
  emptyStateTitle,
  emptyStateDescription,
  resultText,
}: ExperiencePageProps<T>) {
  const pathname = usePathname();
  const categoryOrder = ["/attractions", "/restaurants", "/parades", "/fireworks"] as const;
  const categoryLabels: Record<string, string> = {
    "/attractions": "Attractions",
    "/restaurants": "Restaurants",
    "/parades": "Parades",
    "/fireworks": "Fireworks",
  };

  const currentIndex = categoryOrder.indexOf(pathname as (typeof categoryOrder)[number]);
  const nextCategory = currentIndex >= 0 && currentIndex < categoryOrder.length - 1
    ? categoryOrder[currentIndex + 1]
    : null;

  const groups = useMemo(
    () => filters && filters.length > 0 ? filters : buildDefaultFilterGroups(items),
    [filters, items],
  );

  const initialFilters = useMemo(
    () => Object.fromEntries(groups.map((group) => [group.key, [] as string[]])) as Record<string, string[]>,
    [groups],
  );

  const [searchText, setSearchText] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);

  const toggleFilter = (groupKey: string, option: string) => {
    setSelectedFilters((current) => {
      const currentValues = current[groupKey] ?? [];
      const nextValues = currentValues.includes(option)
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option];

      return {
        ...current,
        [groupKey]: nextValues,
      };
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchText.trim().toLowerCase());
    const matchesAllFilters = groups.every((group) => {
      const selectedValues = selectedFilters[group.key] ?? [];
      if (selectedValues.length === 0) {
        return true;
      }

      const value = group.key === "rideType" ? (item.rideType ?? item.type) : item[group.key as keyof T];
      return value !== undefined && selectedValues.includes(String(value));
    });

    return matchesName && matchesAllFilters;
  });

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (total, values) => total + values.length,
    0,
  );

  const clearFilters = () => {
    setSelectedFilters(Object.fromEntries(groups.map((group) => [group.key, [] as string[]])) as Record<string, string[]>);
  };

  return (
    <main className="min-h-screen bg-white p-4 font-sans text-black sm:p-6">
      <header className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/planner"
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Back to planner
            </Link>

            {nextCategory ? (
              <Link
                href={nextCategory}
                className="rounded-full bg-blue-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-800"
              >
                Next: {categoryLabels[nextCategory]}
              </Link>
            ) : (
              <Link
                href="/itinerary"
                className="rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Finish planning
              </Link>
            )}

            <AccountNav />
          </div>
        </div>
      </header>

      <nav aria-label="Experience categories" className="mb-6 flex flex-wrap gap-2">
        <a
          href="/"
          className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Home
        </a>
        <a
          href="/attractions"
          className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Attractions
        </a>
        <a
          href="/restaurants"
          className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Restaurants
        </a>
        <a
          href="/parades"
          className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Parades
        </a>
        <a
          href="/fireworks"
          className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Fireworks
        </a>
      </nav>

      <div className="grid items-start gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Filters</h2>
            {activeFilterCount > 0 && (
              <button
                className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-5">
            {groups.map((group) => (
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
                          checked={selectedFilters[group.key]?.includes(option) ?? false}
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
          <label className="sr-only" htmlFor="experience-search">Search items</label>
          <input
            id="experience-search"
            className="mb-3 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-black outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            type="search"
            placeholder={searchPlaceholder}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <p id="results-heading" className="mb-4 text-sm text-slate-600" aria-live="polite">
            {resultText ? resultText(filteredItems.length, items.length) : `Showing ${filteredItems.length} of ${items.length} items`}
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id}>{renderCard(item)}</div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center md:col-span-2 xl:col-span-3">
                <p className="text-lg font-semibold">{emptyStateTitle}</p>
                <p className="mt-1 text-sm text-slate-600">{emptyStateDescription}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/itinerary"
          className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          View Itinerary
        </Link>
      </div>
    </main>
  );
}
