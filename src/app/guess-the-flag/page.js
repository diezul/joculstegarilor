"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectContinentsFlag() {
  const router = useRouter();
  const continents = ["Europe", "Asia", "North America", "South America", "Oceania"];

  const [selected, setSelected] = useState([]);   // ← no type annotation

  const toggleContinent = (c) =>
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const startGame = () => {
    if (selected.length === 0) return;
    router.push(`/guess-the-flag/game?continents=${selected.join(",")}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-2">🌍 Select Continents</h1>
      <p className="text-sm text-gray-400 mb-6">
        Select <span className="font-semibold">one&nbsp;or&nbsp;more</span> continents to play
      </p>

      {/* Continents list */}
      <div className="grid grid-cols-1 gap-3">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => toggleContinent(c)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition
              ${selected.includes(c) ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            {selected.includes(c) ? "✅" : "☐"} {c}
          </button>
        ))}
      </div>

      {/* Start */}
      <button
        onClick={startGame}
        disabled={selected.length === 0}
        className={`mt-6 px-6 py-3 font-bold rounded-lg transition
          ${selected.length ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 cursor-not-allowed"}`}
      >
        🚩 Start Game
      </button>

      {/* Go Back */}
      <button
        onClick={() => router.push("/")}
        className="mt-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        🔙 Go Back
      </button>
    </div>
  );
}
