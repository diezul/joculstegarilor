"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-center">
        {/* The file lives in /public, so just reference it by URL */}
        <Image
          src="/logo.png"
          alt="GeoMaster logo"
          width={240}
          height={240}
          priority
          className="h-auto w-[180px] sm:w-[220px] md:w-[240px] object-contain"
        />
      </div>

      <p className="text-center text-sm text-gray-300 mb-8">
        Select a game mode to test your geography skills
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/guess-the-flag"
          className="px-6 py-4 rounded-lg bg-blue-600 text-center font-semibold hover:bg-blue-700 transition"
        >
          🏳️  Guess the Flag
        </Link>

        <Link
          href="/guess-the-capital"
          className="px-6 py-4 rounded-lg bg-green-600 text-center font-semibold hover:bg-green-700 transition"
        >
          🏛️  Guess the Capital
        </Link>
      </div>
    </main>
  );
}
