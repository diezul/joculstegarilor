"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function Results() {
  const params = useSearchParams();
  const score = params.get("score") || 0;
  const mistakes = JSON.parse(params.get("mistakes") || "[]");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🏁 Results</h1>
      <p className="text-2xl font-semibold mb-8">Score: {score}</p>

      {mistakes.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-96 mb-8">
          <h2 className="text-lg font-bold mb-4 text-center">❌ Your Mistakes</h2>
          <ul className="space-y-4">
            {mistakes.map((m, i) => (
              <li key={i} className="bg-gray-700 p-3 rounded">
                <p className="mb-1">
                  Country: <span className="text-yellow-400">{m.question}</span>
                </p>
                <p className="text-sm text-red-300 mb-1">
                  You chose: {m.wrong}
                </p>
                <p className="text-sm text-green-400">
                  Correct: {m.correct}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => router.push("/guess-the-capital")}
        className="px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        🔄 Play Again
      </button>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading…</div>}>
      <Results />
    </Suspense>
  );
}
