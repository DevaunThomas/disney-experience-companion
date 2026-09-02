export type Parade = {
  id: number;
  name: string;
  park: string;
  land: string;
  status: string;
  waitTime: number;
  type: string;
  showtime: string;
  performanceType: string;
  description: string;
};

export const parades: Parade[] = [
  {
    id: 1,
    name: "Mickey's Mix Magic",
    park: "Disneyland",
    land: "Main Street, U.S.A.",
    status: "Open",
    waitTime: 15,
    type: "Parade",
    showtime: "2:00 PM",
    performanceType: "Daytime Parade",
    description: "A cheerful daytime parade packed with Disney favorites, dancing, and vibrant floats.",
  },
  {
    id: 2,
    name: "Wondrous Journeys",
    park: "Disneyland",
    land: "Main Street, U.S.A.",
    status: "Open",
    waitTime: 20,
    type: "Nighttime Spectacular",
    showtime: "8:30 PM",
    performanceType: "Nighttime Celebration",
    description: "A magical nighttime show with immersive visuals and music that brings classic stories to life.",
  },
  {
    id: 3,
    name: "Better Together: A Pixar Celebration!",
    park: "Disney's California Adventure",
    land: "Buena Vista Street",
    status: "Open",
    waitTime: 10,
    type: "Parade",
    showtime: "3:30 PM",
    performanceType: "Daytime Parade",
    description: "A festive parade celebrating Pixar stories and characters along the park's main promenade.",
  },
  {
    id: 4,
    name: "Festival of Fantasy",
    park: "Disneyland",
    land: "Fantasyland",
    status: "Scheduled",
    waitTime: 20,
    type: "Parade",
    showtime: "1:45 PM",
    performanceType: "Character Parade",
    description: "A grand parade honoring Disney princesses, heroes, and storybook magic across the castle route.",
  },
  {
    id: 5,
    name: "Disney Junior Dance Party!",
    park: "Disneyland",
    land: "Mickey's Toontown",
    status: "Open",
    waitTime: 5,
    type: "Live Performance",
    showtime: "11:30 AM",
    performanceType: "Character Celebration",
    description: "A lively stage show featuring favorite Disney Junior characters and upbeat music for families.",
  },
];
