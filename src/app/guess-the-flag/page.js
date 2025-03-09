"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectContinent() {
  const router = useRouter();
  const [selectedContinents, setSelectedContinents] = useState([]);

  const continents = ["Europe", "Asia", "North America", "South America", "Oceania"];

  const toggleContinent = (continent) => {
    setSelectedContinents((prev) =>
      prev.includes(continent)
        ? prev.filter((c) => c !== continent)
        : [...prev, continent]
    );
  };

  const startGame = () => {
    if (selectedContinents.length === 0) return;
    router.push(`/guess-the-flag/game?continents=${selectedContinents.join(",")}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🌍 Select continents</h1>

      <div className="grid grid-cols-1 gap-3">
        {continents.map((continent) => (
          <button
            key={continent}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              selectedContinents.includes(continent) ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => toggleContinent(continent)}
          >
            {continent}
          </button>
        ))}
      </div>

      {/* Start Game Button */}
      <button
        className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
        onClick={startGame}
      >
        ✅ Start Game
      </button>

      {/* 🔙 Go Back Button */}
      <button
        className="mt-3 px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition text-sm"
        onClick={() => router.push("/")}
      >
        🔙 Go Back
      </button>
    </div>
  );
}
