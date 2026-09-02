export type CategoryKey = "attractions" | "restaurants" | "parades" | "fireworks";

export type ItineraryEntry = {
  category: CategoryKey;
  id: number;
  name: string;
  note?: string;
  park?: string;
  land?: string;
  addedAt?: number;
};

export type ItineraryPlan = {
  planName: string;
  date: string;
  notes: string;
  items: ItineraryEntry[];
};

export function generateDefaultPlanName(email?: string | null) {
  if (email) {
    const localPart = email.split("@")[0]?.trim();
    if (localPart) {
      return `${localPart.charAt(0).toUpperCase()}${localPart.slice(1)}'s Magical Day`;
    }
  }

  return "My Magical Day";
}

export function getItineraryKey(email?: string | null) {
  return email ? `disney-itinerary:${email}` : "disney-itinerary:guest";
}

export function readItineraryPlan(email?: string | null): ItineraryPlan {
  if (typeof window === "undefined") {
    return { planName: generateDefaultPlanName(email), date: "", notes: "", items: [] };
  }

  const key = getItineraryKey(email);
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return { planName: generateDefaultPlanName(email), date: "", notes: "", items: [] };
  }

  try {
    const parsed = JSON.parse(raw) as ItineraryPlan | ItineraryEntry[] | null;

    if (Array.isArray(parsed)) {
      return {
        planName: generateDefaultPlanName(email),
        date: "",
        notes: "",
        items: parsed.filter((entry) => typeof entry?.name === "string" && typeof entry?.id === "number"),
      };
    }

    const items = Array.isArray(parsed?.items)
      ? parsed.items.filter((entry) => typeof entry?.name === "string" && typeof entry?.id === "number")
      : [];

    return {
      planName: typeof parsed?.planName === "string" && parsed.planName.trim().length > 0
        ? parsed.planName
        : generateDefaultPlanName(email),
      date: typeof parsed?.date === "string" ? parsed.date : "",
      notes: typeof parsed?.notes === "string" ? parsed.notes : "",
      items,
    };
  } catch {
    return { planName: generateDefaultPlanName(email), date: "", notes: "", items: [] };
  }
}

export function readItinerary(email?: string | null): ItineraryEntry[] {
  return readItineraryPlan(email).items;
}

export function saveItinerary(
  entries: ItineraryEntry[],
  email?: string | null,
  overrides: Partial<Pick<ItineraryPlan, "planName" | "date" | "notes">> = {},
) {
  if (typeof window === "undefined") return;

  const currentPlan = readItineraryPlan(email);
  const nextPlan: ItineraryPlan = {
    planName: overrides.planName ?? currentPlan.planName ?? generateDefaultPlanName(email),
    date: overrides.date ?? currentPlan.date ?? "",
    notes: overrides.notes ?? currentPlan.notes ?? "",
    items: entries,
  };

  window.localStorage.setItem(getItineraryKey(email), JSON.stringify(nextPlan));
  return nextPlan;
}

export function savePlanMetadata(
  planName: string,
  date: string,
  notes: string,
  email?: string | null,
) {
  const currentPlan = readItineraryPlan(email);
  const nextPlan: ItineraryPlan = {
    planName: planName.trim().length > 0 ? planName : currentPlan.planName,
    date: date || currentPlan.date,
    notes: notes || currentPlan.notes,
    items: currentPlan.items,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(getItineraryKey(email), JSON.stringify(nextPlan));
  }

  return nextPlan;
}

export type PlanStorageAdapter = {
  load: (email?: string | null) => ItineraryPlan;
  save: (plan: ItineraryPlan, email?: string | null) => void;
  clear: (email?: string | null) => void;
};

export const localStorageAdapter: PlanStorageAdapter = {
  load: readItineraryPlan,
  save: (plan, email) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(getItineraryKey(email), JSON.stringify(plan));
    }
  },
  clear: (email) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getItineraryKey(email));
    }
  },
};

export async function savePlanToBackend(
  plan: ItineraryPlan,
  email?: string | null,
  adapter: PlanStorageAdapter = localStorageAdapter,
) {
  adapter.save(plan, email);
  return plan;
}

export function addExperienceToItinerary(
  category: string,
  id: number,
  name: string,
  email?: string | null,
  extra: Partial<Omit<ItineraryEntry, "category" | "id" | "name">> = {},
) {
  const nextEntries = [
    ...readItinerary(email).filter((entry) => !(entry.category === category && entry.id === id)),
    {
      category: category as CategoryKey,
      id,
      name,
      addedAt: Date.now(),
      ...extra,
    },
  ];

  saveItinerary(nextEntries, email);
  return nextEntries;
}

export function removeExperienceFromItinerary(
  category: string,
  id: number,
  email?: string | null,
) {
  const nextEntries = readItinerary(email).filter(
    (entry) => !(entry.category === category && entry.id === id),
  );

  saveItinerary(nextEntries, email);
  return nextEntries;
}

export function moveExperienceInItinerary(
  category: string,
  id: number,
  direction: "up" | "down",
  email?: string | null,
) {
  const entries = readItinerary(email);
  const index = entries.findIndex((entry) => entry.category === category && entry.id === id);

  if (index === -1) return entries;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= entries.length) return entries;

  const nextEntries = [...entries];
  const [movedItem] = nextEntries.splice(index, 1);
  nextEntries.splice(targetIndex, 0, movedItem);

  saveItinerary(nextEntries, email);
  return nextEntries;
}
