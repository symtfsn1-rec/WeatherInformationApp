'use client';

import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useLocalStorage";

type FavoriteButtonProps = {
  city: string;
};

export function FavoriteButton({ city }: FavoriteButtonProps) {
  const { favorites, toggleFavorite, isLoaded } = useFavorites();

  const normalizedCity = city.toLowerCase();
  const isFavorite = favorites.includes(normalizedCity);

  if (!isLoaded) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(city)}
      className="mr-3.5 hover:opacity-70 active:scale-80 focus:outline-none"
      aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Star
        className={`w-8 h-8 transition-colors ${isFavorite
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-400 fill-transparent"
          }`}
      />
    </button>
  );
}