"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Results() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score")) || 0;
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHighScore = localStorage.getItem("highScore") || 0;
      if (score > storedHighScore) {
        localStorage.setItem("highScore", score);
        setHighScore(score);
      } else {
        setHighScore(storedHighScore);
      }
    }
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🏆 Rezultate</h1>
      <p className="text-2xl mb-6">Scor final: {score} puncte</p>
      <p className="text-xl mb-6">📈 Highscore: {highScore}</p>
      <Link href="/game" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700 transition">
        🔄 Reîncearcă
      </Link>
    </div>
  );
}
