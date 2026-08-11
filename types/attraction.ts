
// Interface for representing a Disney attraction
export interface Attraction {
  id: number;
  name: string;
  waitTime: number;
  park: "Disneyland" | "Disney's California Adventure";
  rideType: "Dark Ride" | "Thrill Ride" | "Water Ride" | "Family Ride" | "Show" | "Parade" | "Character Meet & Greet";
  land: "Adventureland" | "Critter Country" | "Fantasyland" | "Frontierland" | "Main Street, U.S.A." | "Mickey's Toontown" | "New Orleans Square" | "Star Wars: Galaxy's Edge" | "Tomorrowland" | "Buena Vista Street" | "Cars Land" | "Grizzly Peak" | "Hollywood Land" | "Pixar Pier" | "Avengers Campus" | "Paradise Gardens Park";
  heightRequirement?: number;
  description: string;
  status: "Open" | "Closed" | "Closed for Refurbishment" | "Down";
  image?: string; // Optional property for the image URL of the attraction  
};