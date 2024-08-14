import { PetBreed } from "@/types/pet";

export function filterBreedsWithImages(breeds: PetBreed[]): PetBreed[] {
  return breeds.filter((breed) => breed.image && breed.image.url);
}
