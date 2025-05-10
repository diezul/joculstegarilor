"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        🎮 Welcome to Flag Quiz
      </h1>

      {/* Guess the Flag */}
      <Link
        href="/guess-the-flag"
        className="block w-72 text-center px-6 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
      >
        🚩 Guess the Flag
      </Link>

      {/* Guess the Capital – NOW ACTIVE */}
      <Link
        href="/guess-the-capital"
        className="block w-72 text-center px-6 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
      >
        🏛️ Guess the Capital
      </Link>

      {/* Who is Higher – still disabled */}
      <button
        disabled
        className="block w-72 text-center px-6 py-4 bg-gray-700 rounded-lg font-semibold text-gray-400 cursor-not-allowed"
      >
        📊 Who is Higher? (Coming Soon)
      </button>
    </main>
  );
}
