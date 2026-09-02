export type Restaurant = {
  id: number;
  name: string;
  park: string;
  land: string;
  status: string;
  waitTime: number;
  type: string;
  cuisine: string;
  diningStyle: string;
  description: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Blue Bayou Restaurant",
    park: "Disneyland",
    land: "New Orleans Square",
    status: "Open",
    waitTime: 35,
    type: "Table Service",
    cuisine: "Creole",
    diningStyle: "Indoor",
    description: "A classic table-service dining experience in a pirate-themed setting with moody bayou ambiance.",
  },
  {
    id: 2,
    name: "Plaza Inn",
    park: "Disneyland",
    land: "Main Street, U.S.A.",
    status: "Open",
    waitTime: 25,
    type: "Character Dining",
    cuisine: "American",
    diningStyle: "Casual",
    description: "A family-friendly restaurant with character appearances and comfort-food favorites near the hub.",
  },
  {
    id: 3,
    name: "Lamplight Lounge",
    park: "Disney's California Adventure",
    land: "Pixar Pier",
    status: "Open",
    waitTime: 20,
    type: "Quick Service",
    cuisine: "American",
    diningStyle: "Outdoor",
    description: "A popular waterfront restaurant with a relaxed California vibe and scenic views of the bay.",
  },
  {
    id: 4,
    name: "Cafe Orleans",
    park: "Disneyland",
    land: "New Orleans Square",
    status: "Open",
    waitTime: 40,
    type: "Table Service",
    cuisine: "French",
    diningStyle: "Indoor",
    description: "A charming New Orleans-style dining room serving classic French-inspired dishes and Mickey beignets.",
  },
  {
    id: 5,
    name: "Auntie Gravity's Galactic Goodies",
    park: "Disneyland",
    land: "Tomorrowland",
    status: "Open",
    waitTime: 10,
    type: "Quick Service",
    cuisine: "Snacks",
    diningStyle: "Casual",
    description: "A fun stop for themed treats and quick bites in the heart of Tomorrowland.",
  },
  {
    id: 6,
    name: "Flo's V8 Cafe",
    park: "Disney's California Adventure",
    land: "Cars Land",
    status: "Open",
    waitTime: 18,
    type: "Quick Service",
    cuisine: "American",
    diningStyle: "Casual",
    description: "A lively roadside eatery inspired by Cars that keeps guests fueled for the day.",
  },
];
