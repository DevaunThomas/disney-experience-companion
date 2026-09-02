export type FireworkShow = {
  id: number;
  name: string;
  park: string;
  land: string;
  status: string;
  waitTime: number;
  type: string;
  showtime: string;
  viewLocation: string;
  description: string;
};

export const fireworks: FireworkShow[] = [
  {
    id: 1,
    name: "Wondrous Journeys",
    park: "Disneyland",
    land: "Main Street, U.S.A.",
    status: "Open",
    waitTime: 30,
    type: "Fireworks",
    showtime: "9:30 PM",
    viewLocation: "Main Street, U.S.A.",
    description: "A nighttime fireworks spectacular with immersive projections and classic Disney music.",
  },
  {
    id: 2,
    name: "World of Color",
    park: "Disney's California Adventure",
    land: "Paradise Gardens Park",
    status: "Open",
    waitTime: 25,
    type: "Water Spectacular",
    showtime: "9:00 PM",
    viewLocation: "Paradise Bay",
    description: "A water-based nighttime spectacular with lights, projections, and music set to beloved Disney songs.",
  },
  {
    id: 3,
    name: "Fantasmic!",
    park: "Disneyland",
    land: "New Orleans Square",
    status: "Scheduled",
    waitTime: 40,
    type: "Nighttime Show",
    showtime: "9:15 PM",
    viewLocation: "Rivers of America",
    description: "A dramatic nighttime show featuring live performances, projections, fireworks, and water effects.",
  },
  {
    id: 4,
    name: "Mickey's Mix Magic",
    park: "Disneyland",
    land: "Main Street, U.S.A.",
    status: "Open",
    waitTime: 35,
    type: "Fireworks",
    showtime: "8:45 PM",
    viewLocation: "Castle Hub",
    description: "A colorful fireworks finale with classic Disney soundtrack moments and bright nighttime visuals.",
  },
  {
    id: 5,
    name: "Glow Fest",
    park: "Disney's California Adventure",
    land: "Paradise Gardens Park",
    status: "Scheduled",
    waitTime: 20,
    type: "Nighttime Celebration",
    showtime: "7:30 PM",
    viewLocation: "Harbor Boulevard",
    description: "A luminous evening event blending music, lighting, and festive energy across the waterfront.",
  },
];
