import { Venue } from "./Venues";

export interface City {
  name: string;
  venues?: Venue[];
}

export const CITIES: City[] = [
  {
    name: "Paris",
    venues: [
      {
        name: "Etoile",
      },
      {
        name: "Madeleine",
      },
      {
        name: "Parmentier",
      },
      {
        name: "Richer",
      },
      {
        name: "Sentier",
      },
    ],
  },
  {
    name: "Bordeaux",
  },
  {
    name: "Madrid",
    venues: [
      {
        name: "Recoletos",
      },
      {
        name: "Luchana",
      },
    ],
  },
];
