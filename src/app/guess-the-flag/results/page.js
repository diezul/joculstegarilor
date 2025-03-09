"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score") || 0;
  const mistakes = JSON.parse(searchParams.get("mistakes") || "[]");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🏆 Results</h1>
      <p className="text-2xl font-semibold mb-4">Final Score: {score} points</p>

      {/* Afișează greșelile */}
      {mistakes.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-80 text-center mb-6">
          <h2 className="text-lg font-bold mb-2">❌ Mistakes:</h2>
          <ul className="list-none space-y-2">
            {mistakes.map((mistake, index) => (
              <li key={index} className="bg-red-600 p-2 rounded text-white">
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => router.push("/guess-the-flag")}
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        🔄 Play Again
      </button>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
