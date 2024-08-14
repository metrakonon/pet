import { PetBreed } from "@/types/pet";

export function shuffleArray(dogs: PetBreed[], cats: PetBreed[]): PetBreed[] {
  const combined: PetBreed[] = [];
  const minLength = Math.min(dogs.length, cats.length);

  for (let i = 0; i < minLength; i++) {
    combined.push(dogs[i], cats[i]);
  }

  if (dogs.length > cats.length) {
    combined.push(...dogs.slice(minLength));
  } else {
    combined.push(...cats.slice(minLength));
  }

  return combined;
}
