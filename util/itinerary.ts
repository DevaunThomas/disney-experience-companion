export type ItineraryEntry = {
  category: string;
  id: number;
  name: string;
};

export function getItineraryKey(email?: string | null) {
  return email ? `disney-itinerary:${email}` : "disney-itinerary:guest";
}

export function readItinerary(email?: string | null): ItineraryEntry[] {
  if (typeof window === "undefined") return [];

  const key = getItineraryKey(email);
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as ItineraryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveItinerary(entries: ItineraryEntry[], email?: string | null) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getItineraryKey(email), JSON.stringify(entries));
}

export function addExperienceToItinerary(
  category: string,
  id: number,
  name: string,
  email?: string | null,
) {
  const nextEntries = [
    ...readItinerary(email).filter((entry) => !(entry.category === category && entry.id === id)),
    { category, id, name },
  ];

  saveItinerary(nextEntries, email);
  return nextEntries;
}
