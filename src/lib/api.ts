const DOG_API_URL = "https://api.thedogapi.com/v1/breeds";
const CAT_API_URL = "https://api.thecatapi.com/v1/breeds";

const API_DOG_KEY =
  "live_5x9dnGfePvq0FHzoWkAoBtHPNrvj2fYNSbgtfPuqRxcezXFQCUt5HMWp6FKrBVkH";

const API_CAT_KEY =
  "live_aRpkM8N9fhOXxHXQAywCQqxO9EdNzxCDg3SDwWtfV0pbHIbatAVgyGBttO8Q846Q";

export async function fetchAllDogBreeds() {
  const response = await fetch(DOG_API_URL, {
    headers: {
      "x-api-key": API_DOG_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dog breeds");
  }
  return await response.json();
}

export async function fetchAllCatBreeds() {
  const response = await fetch(CAT_API_URL, {
    headers: {
      "x-api-key": API_CAT_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cat breeds");
  }
  return await response.json();
}

export async function fetchData() {
  const dogs = await fetchAllDogBreeds();
  const cats = await fetchAllCatBreeds();
  return { dogs, cats };
}
