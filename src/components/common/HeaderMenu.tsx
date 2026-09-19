'use client';
import { useState } from "react";
import Link from "next/link";
import { X, Menu, ChevronRight } from 'lucide-react';

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-50 h-full flex items-center">
        <nav className="hidden h-full md:flex items-center gap-4 md:text-sm lg:text-base">
          <Link
            href="/favorites"
            className="h-full flex items-center px-4 active:scale-95 hover:underline hover:bg-linear-to-b from-[#66e0ff] from-5% via-[#6ec0ff] via-75%  to-[#5fa0fa]"
          >
            お気に入り都市一覧
          </Link>
        </nav>

        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          className="p-2 md:hidden"
        >
          {isOpen ? <X className="w-8 h-8 hover:cursor-pointer" /> : <Menu className="w-8 h-8 hover:cursor-pointer" />}
        </button>

      </div>

      {/* メニューが開いてる時に表示されるコンテンツ */}
      {isOpen && (
        <div className="fixed top-0 right-0 z-40 w-full h-screen overflow-y-auto overscroll-none bg-linear-to-b from-[#66e0ff] from-5% via-[#6ec0ff] via-75%  to-[#5fa0fa] py-16 text-center text-[clamp(16px,2.6vw,20px)] font-bold md:hidden ">
          <Link href="/" onClick={toggleMenu} className="block py-5 border-y">Top トップ <ChevronRight className="inline-block ml-2" /></Link>
          <Link href="/favorites" onClick={toggleMenu} className="block py-5 border-b">Favorites お気に入り都市一覧 <ChevronRight className="inline-block ml-2" /></Link>
        </div>
      )}
    </>
  )
}