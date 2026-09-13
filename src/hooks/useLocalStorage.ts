"use client";
import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("favorite_cities");
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
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

  const toggleFavorite = (city: string) => {
    const normalized = city.toLowerCase();
    const updated = favorites.includes(normalized)
      ? favorites.filter((c) => c !== normalized)
      : [...favorites, normalized];

    setFavorites(updated);
    localStorage.setItem("favorite_cities", JSON.stringify(updated));

    window.dispatchEvent(new Event("favorites_updated"));
  };

  return { favorites, toggleFavorite, isLoaded };
}