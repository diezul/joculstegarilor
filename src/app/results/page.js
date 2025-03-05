"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score") || 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🏆 Rezultate</h1>
      <p className="text-2xl font-semibold">Scor final: {score} puncte</p>

      <button
        onClick={() => window.location.href = "/game"}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        🔄 Reîncearcă
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
