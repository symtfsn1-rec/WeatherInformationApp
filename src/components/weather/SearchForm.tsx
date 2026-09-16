'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchSchema } from "@/schemas/weather";
import { Search } from "lucide-react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = searchParams.get('city') || '';

  const [city, setCity] = useState(currentParams);
  const [error, setError] = useState('');

  useEffect(() => {
    setCity(currentParams);
    setError('');
  }, [currentParams]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = searchSchema.safeParse({ city });

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      setError(errorMessage);
      return;
    }
    setError('');
    router.push(`/?city=${encodeURIComponent(city.trim())}`);
  };

  return (
    <div className="max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="例：渋谷, ロンドン, パリ, (英語も可)"
          className="w-full px-2 py-1 rounded-full text-sm md:text-base bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <button type="submit" aria-label="検索">
          <Search className="w-8 h-8 p-1 rounded-full text-white bg-linear-to-b from-[#66e0ff] from-5% via-[#6ec0ff] via-75%  to-[#5fa0fa] hover:cursor-pointer hover:opacity-70 active:scale-95" />
        </button>
      </form>
      {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
    </div>
  )
}