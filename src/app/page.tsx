"use client";

import React, { useEffect, useRef } from "react";
import { useBreedStore } from "@/store/breedStore";
import Link from "next/link";
import Loader from "@/component/Loader/Loader";

export default function Home() {
  const {
    dogBreeds,
    catBreeds,
    combinedBreeds,
    filter,
    setFilter,
    fetchBreeds,
    loading,
    setLoading,
  } = useBreedStore();

  useEffect(() => {
    fetchBreeds()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  const filteredBreeds = (() => {
    if (filter === "all") return combinedBreeds;
    if (filter === "dogs") return dogBreeds;
    if (filter === "cats") return catBreeds;
    return [];
  })();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-xl font-bold text-gray-800 mb-4">
              Filter:
              <select
                value={filter}
                onChange={handleFilterChange}
                className="ml-2 p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="all">All</option>
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBreeds.map((breed) => (
              <Link href={`/breed/${breed.id}/`} key={breed.id}>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-64">
                  {breed.image && breed.image.url && (
                    <img
                      src={breed.image.url}
                      alt={breed.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="flex flex-col p-4 bg-white flex-grow">
                    <p className="text-lg font-semibold text-gray-800 text-center truncate overflow-hidden">
                      {breed.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
