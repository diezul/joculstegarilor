"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">🎮 Welcome to Flag Quiz</h1>

      <div className="grid grid-cols-1 gap-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          onClick={() => router.push("/guess-the-flag")}
        >
          🚩 Guess the Flag
        </button>
        
        <button
          className="px-6 py-3 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed"
          disabled
        >
          🏛️ Guess the Capital (Coming Soon)
        </button>

        <button
          className="px-6 py-3 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed"
          disabled
        >
          📊 Who is Higher? (Coming Soon)
        </button>
      </div>
    </div>
  );
}
