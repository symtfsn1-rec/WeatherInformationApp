'use client';

import { FavoriteButton } from "./FavoriteButton";
import { useFavorites } from "@/hooks/useLocalStorage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FavoriteList() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center mt-10">
          <p className="text-red-500 text-center">
            <span className="inline-block">お気に入りの都市が</span>
            <span className="inline-block">登録されていません。</span>
          </p>
        <Link href="/" className="hover:underline text-lg py-2">
          都市を検索する
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {favorites.map((item) => (
        <div
          key={item.city}
          className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex justify-between items-center"
        >
          <Link
            href={`/weather/${encodeURIComponent(item.city)}`}
            className="flex-1 flex justify-between items-center pr-4"
          >
            <div>
              <h3 className="text-lg font-bold text-black capitalize">
                {item.city}{item.country ? `, ${item.country.toUpperCase()}` : ''}
              </h3>
              <span className="text-xs text-gray-400 group-hover:text-black transition-colors flex items-center mt-1">
                天気情報を見る <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </Link>

          <div className="shrink-0">
            <FavoriteButton city={item.city} country={item.country} />
          </div>
        </div>
      ))}
    </div>
  );
}