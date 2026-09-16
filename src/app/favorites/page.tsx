import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FavoriteList } from "@/components/favorites/FavoriteList";

export default function FavoritesPage() {
  return (
    <div className="max-w-3xl mx-auto px-2 space-y-4 mb-24">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-black mt-2"
        >
          <ArrowLeft className="w-5 h-5 mr-1.5" />
          <span className="text-sm font-medium">トップへ戻る</span>
        </Link>
      </div>
      <FavoriteList />
    </div>
  );
}