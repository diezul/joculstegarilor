"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score") || 0;
  const mistakes = JSON.parse(searchParams.get("mistakes") || "[]");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🏆 Results</h1>
      <p className="text-2xl font-semibold mb-4">Final Score: {score} points</p>

      {/* Afișează toate cele 3 greșeli */}
      {mistakes.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-96 text-center mb-6">
          <h2 className="text-lg font-bold mb-2">❌ Your Mistakes:</h2>
          <ul className="space-y-4">
            {mistakes.map((mistake, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded text-white text-left">
                {/* Steagul care a fost în quiz */}
                <div className="flex justify-center mb-2">
                  <Image
                    src={`/flags/${mistake.flag}`}
                    alt="Flag"
                    width={100}
                    height={60}
                    className="object-contain"
                  />
                </div>

                {/* Varianta corectă și cea greșită */}
                <p className="text-sm text-gray-300 mb-1">❌ You chose: <span className="text-red-500 font-semibold">{mistake.wrongAnswer}</span></p>
                <p className="text-sm text-gray-300">✅ Correct answer: <span className="text-green-500 font-semibold">{mistake.correctAnswer}</span></p>
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
