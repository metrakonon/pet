import { create } from "zustand";
import { PetBreed } from "@/types/pet";
import { filterBreedsWithImages } from "@/helper/filterBreedsWithImage";
import { shuffleArray } from "@/helper/shuffleArray";
import { fetchData } from "@/lib/api";

type BreedState = {
  dogBreeds: PetBreed[];
  catBreeds: PetBreed[];
  combinedBreeds: PetBreed[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  filter: string;
  setFilter: (filter: string) => void;
  fetchBreeds: () => Promise<void>;
  getBreedById: (id: string | number) => PetBreed | undefined;
};

export const useBreedStore = create<BreedState>((set, get) => ({
  dogBreeds: [],
  catBreeds: [],
  combinedBreeds: [],
  loading: true,
  setLoading: (loading) => set({ loading }),
  filter: "all",
  setFilter: (filter) => set({ filter }),
  fetchBreeds: async () => {
    const { dogBreeds, catBreeds } = get();
    if (dogBreeds.length > 0 && catBreeds.length > 0) {
      return;
    }

    try {
      const { dogs, cats } = await fetchData();
      const filteredDogs = filterBreedsWithImages(dogs);
      const filteredCats = filterBreedsWithImages(cats);
      set({
        dogBreeds: filteredDogs,
        catBreeds: filteredCats,
        combinedBreeds: shuffleArray(filteredDogs, filteredCats),
      });
    } catch (error: any) {
      console.error(error.message);
    }
  },
  getBreedById: (id: string | number) => {
    const { combinedBreeds } = get();
    const numberId = typeof id === "string" ? parseInt(id, 10) : id;

    return combinedBreeds.find((breed) =>
      typeof breed.id === "string" ? breed.id === id : breed.id === numberId,
    );
  },
}));
