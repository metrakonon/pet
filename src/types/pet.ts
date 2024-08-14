export type CatBreed = {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  cfa_url: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  image: {
    height: number;
    id: string;
    url: string;
    width: number;
  };
  indoor: number;
  intelligence: number;
  lap: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vcahospitals_url: string;
  vetstreet_url: string;
  vocalisation: number;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url: string;
};

export type DogBreed = {
  bred_for: string;
  breed_group: string;
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  life_span: string;
  name: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
  weight: {
    imperial: string;
    metric: string;
  };
};

export type PetBreed = CatBreed | DogBreed;
