import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

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
  currentCityId: number;
  addCity: (
    name: string,
    country: string,
    timezone: string,
    lat: number,
    lon: number
  ) => void;
  changeCurrentCity: (cityId: number) => void;
  removeCity: (cityId: number) => void;
}

export const useCitiesStore = create<CitiesStore>()(
  devtools(
    persist(
      immer(set => ({
        cities: [],
        currentCity: {
          name: 'Penza',
          country: 'Russia',
          timezone: 'Europe/Moscow',
          lat: 53.20066,
          lon: 45.00464,
        },
        currentCityId: 0,
        addCity: (
          name: string,
          country: string,
          timezone: string,
          lat: number,
          lon: number
        ) =>
          set(state => {
            state.cities.push({
              name: name,
              country: country,
              timezone: timezone,
              lat: lat,
              lon: lon,
            });
          }),
        changeCurrentCity: (cityId: number) =>
          set(state => ({
            currentCity:
              cityId === -1
                ? {
                    name: 'Penza',
                    country: 'Russia',
                    timezone: 'Europe/Moscow',
                    lat: 53.20066,
                    lon: 45.00464,
                  }
                : state.cities[cityId],
            currentCityId: cityId === -1 ? 0 : cityId,
          })),
        removeCity: (cityId: number) =>
          set(state => {
            state.cities.splice(cityId, 1);
          }),
      })),
      {name: 'citiesStore'}
    )
  )
);
