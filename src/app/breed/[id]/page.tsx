"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useBreedStore } from "@/store/breedStore";
import { CatBreed, DogBreed } from "@/types/pet";
import Link from "next/link";
import Loader from "@/component/Loader/Loader";

export default function BreedDetail() {
  const { id } = useParams();
  const dogBreeds = useBreedStore((state) => state.dogBreeds);
  const catBreeds = useBreedStore((state) => state.catBreeds);
  const { getBreedById, fetchBreeds } = useBreedStore();

  const BREED_TYPE_BY_ID = Array.isArray(id);
  const breedId = BREED_TYPE_BY_ID ? id[0] : id;
  const breed = getBreedById(breedId);

  useEffect(() => {
    fetchBreeds();
  }, [id]);

  if (!breed) {
    return <Loader />;
  }

  const isCat = "cfa_url" in breed;
  const suggestBreeds = isCat ? catBreeds : dogBreeds;
  const filteredSuggestions = suggestBreeds
    .filter((s) => s.id !== breed.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <Link
        href="/"
        className="  bg-black text-white rounded-full px-6 py-3 block max-w-[200px] hover:bg-gray-800 transition duration-300 ease-in-out"
      >
        GO TO MAIN PAGE
      </Link>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        {breed.name}
      </h1>
      {breed.image.url && (
        <img
          src={breed.image.url}
          alt={breed.name}
          className="w-full max-h-[500px] object-contain rounded-lg mb-8 shadow-md"
        />
      )}
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        {breed.temperament}
      </p>

      {breed.origin && (
        <p className="text-lg text-gray-700 mb-4">
          <strong>Origin:</strong> {breed.origin}
        </p>
      )}
      {breed.life_span && (
        <p className="text-lg text-gray-700 mb-4">
          <strong>Life Span:</strong> {breed.life_span}
        </p>
      )}
      {breed.weight && (
        <p className="text-lg text-gray-700 mb-4">
          <strong>Weight:</strong> {breed.weight.imperial} lbs /{" "}
          {breed.weight.metric} kg
        </p>
      )}

      {(breed as DogBreed).breed_group && (
        <p className="text-lg text-gray-700 mb-4">
          <strong>Breed Group:</strong> {(breed as DogBreed).breed_group}
        </p>
      )}

      {(breed as CatBreed).cfa_url && (
        <p className="text-lg text-gray-700 mb-8">
          <strong>CFA URL:</strong>{" "}
          <a
            href={(breed as CatBreed).cfa_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {(breed as CatBreed).cfa_url}
          </a>
        </p>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          More Cuties
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSuggestions.map((suggestion) => (
            <Link href={`/breed/${suggestion.id}/`} key={suggestion.id}>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-52">
                {suggestion.image?.url && (
                  <img
                    src={suggestion.image.url}
                    alt={suggestion.name}
                    className="w-full h-36 object-contain"
                  />
                )}
                <div className="p-4 bg-white flex-grow">
                  <p className="text-base font-medium text-gray-800 text-center">
                    {suggestion.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        className="bg-black text-white rounded-full px-6 py-3 block mx-auto hover:bg-gray-800 transition duration-300 ease-in-out"
        onClick={handleGoBack}
      >
        GO BACK
      </button>
    </div>
  );
}
