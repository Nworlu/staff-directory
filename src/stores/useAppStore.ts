import { create } from "zustand";
import type { Country } from "../types/app";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
  countries: Country[];
  countriesLoading: boolean;
  countriesError: string | null;

  setCountries: (countries: Country[]) => void;

  fetchCountries: () => Promise<void>;
  initializeCountries: () => Promise<void>;
  getStatesByCountry: (country: string) => { value: string; label: string }[];
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      countries: [],
      countriesLoading: false,
      countriesError: null,

      setCountries: (countries) => set({ countries }),

      getStatesByCountry: (country) => {
        const states = get()
          .countries.filter((c) => c.country === country)
          .map((c) => c.subcountry)
          .filter(Boolean) // Remove empty values
          .filter((state, index, arr) => arr.indexOf(state) === index) // Remove duplicates
          .sort(); // Sort alphabetically

        return states.map((state) => ({
          value: state,
          label: state,
        }));
      },

      fetchCountries: async () => {
        const { countries } = get();

        // Skip if already loaded (unless forced refresh)
        if (countries.length > 0) {
          return;
        }

        set({ countriesLoading: true, countriesError: null });

        try {
          console.log("Fetching countries data...");
          const response = await fetch(
            "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Country[] = await response.json();
          console.log(`Loaded ${data.length} cities from API`);

          set({
            countries: data,
            countriesLoading: false,
            countriesError: null,
          });
        } catch (error) {
          console.error("Failed to fetch countries:", error);
          set({
            countriesError:
              error instanceof Error
                ? error.message
                : "Failed to fetch countries data",
            countriesLoading: false,
          });
        }
      },
      initializeCountries: async () => {
        await get().fetchCountries();
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        countries: state.countries, // Persist countries to avoid refetching
      }),
      // Add version to handle data migration if needed
      version: 1,
    }
  )
);
