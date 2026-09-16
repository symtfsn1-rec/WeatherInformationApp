"use client";
import { useState, useEffect } from "react";

export type FavoriteItem = {
  city: string;
  country: string;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("favorite_cities");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const normalized: FavoriteItem[] = parsed.map((item: Partial<FavoriteItem>) => ({
            city: typeof item?.city === "string" ? item.city : '',
            country: typeof item?.country === "string" ? item.country : '',
          }));
          setFavorites(normalized);
        } catch (e) {
          console.error(e);
        }
      }
    };

    handleStorageChange();
    setIsLoaded(true);

    window.addEventListener("favorites_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("favorites_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleFavorite = (city: string, country: string) => {
    const normalizedCity = city.toLowerCase();
    const normalizedCountry = country.toLowerCase();
    const exists = favorites.some((f) => f.city.toLowerCase() === normalizedCity);
    const updated = exists ? favorites.filter((f) => f.city.toLowerCase() !== normalizedCity) : [...favorites, { city: normalizedCity, country: normalizedCountry }];

    setFavorites(updated);
    localStorage.setItem("favorite_cities", JSON.stringify(updated));

    window.dispatchEvent(new Event("favorites_updated"));
  };

  return { favorites, toggleFavorite, isLoaded };
}