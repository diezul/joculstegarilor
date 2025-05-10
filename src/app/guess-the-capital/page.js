"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectContinents() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const continents = ["Europe", "Asia", "North America", "South America", "Oceania"];

  const toggle = (c) =>
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const start = () => {
    if (selected.length === 0) return;
    router.push(`/guess-the-capital/game?continents=${selected.join(",")}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🏛️ Select continents</h1>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => toggle(c)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              selected.includes(c) ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <button
        onClick={start}
        className="px-6 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-700 transition"
      >
        ✅ Start Game
      </button>

      <button
        onClick={() => router.push("/")}
        className="mt-4 px-4 py-2 text-sm text-gray-300 hover:text-white underline"
      >
        ⬅️ Go Back
      </button>
    </div>
  );
}
