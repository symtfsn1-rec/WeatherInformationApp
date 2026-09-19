import HeaderMenu from "@/components/common/HeaderMenu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 md:h-20 flex items-center justify-between px-2 md:px-6 bg-white">
      <Link
        href="/"
      >
        <img src="/favicon.svg" alt="Weather Icon" className="w-12 h-12 hover:opacity-80" />
      </Link>
      <HeaderMenu />
    </header>
  );
}