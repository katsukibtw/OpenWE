import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface City {
  name: string;
  country: string;
  timezone: string;
  lat: number;
  lon: number;
}

interface CitiesStore {
  cities: City[];
  currentCity: City;
  addCity: (city: City) => void;
}

export const useCitiesStore = create<CitiesStore>()(
  devtools(
    persist(
      (set) => ({
        cities: [],
        currentCity: null,
        addCity: (city) => set((state) => ({ cities: state.cities + city })),
      }),
      { name: "citiesStore" },
    ),
  ),
);
