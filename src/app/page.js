"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";            // ✅ Path is relative to src/app

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-center">
        {/* 
          * The logo scales down smoothly on small screens and
          * never grows past 240 px on large screens.
        */}
        <Image
          src={logo}
          alt="GeoMaster logo"
          priority
          className="h-auto w-[180px] sm:w-[220px] md:w-[240px] object-contain"
        />
      </div>

      {/* Tagline or helper text (optional) */}
      <p className="text-center text-sm text-gray-300 mb-8">
        Select a game mode to test your geography skills
      </p>

      {/* Game‑mode buttons */}
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

        {/* Add future game modes here */}
      </div>
    </main>
  );
}
