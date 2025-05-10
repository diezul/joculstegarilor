"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import countries from "../../../../../data/countries.json";

export default function GameContent() {
  const params = useSearchParams();
  const selectedContinents = params.get("continents")?.split(",") || [];

  const router = useRouter();

  // ─── State ──────────────────────────────────────────────────────────────
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [usedCountries, setUsedCountries] = useState(new Set());
  const [lastCorrect, setLastCorrect] = useState(null);

  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [bonusTime, setBonusTime] = useState(null);

  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [disabledOpts, setDisabledOpts] = useState([]);

  const [mistakes, setMistakes] = useState([]);

  // ─── Helpers ────────────────────────────────────────────────────────────
  const pushResults = (finalMistakes = mistakes) =>
    router.push(
      `/guess-the-capital/results?score=${score}&mistakes=${encodeURIComponent(
        JSON.stringify(finalMistakes)
      )}`
    );

  // ─── Generate questions once ────────────────────────────────────────────
  useEffect(() => {
    const pool = countries.filter((c) => selectedContinents.includes(c.continent));
    const available = pool.filter((c) => !usedCountries.has(c.name));

    if (available.length === 0) return setQuestions([]);

    const shuffled = [...available].sort(() => Math.random() - 0.5);

    const list = shuffled.map((country) => {
      const same = pool.filter(
        (c) => c.continent === country.continent && c.name !== country.name
      );
      const wrong = same
        .filter((c) => c.name !== lastCorrect)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c) => c.capital);

      return {
        country: country.name,
        correct: country.capital,
        options: [...wrong, country.capital].sort(() => Math.random() - 0.5),
      };
    });

    if (list.length) setUsedCountries(new Set([...usedCountries, list[0].country]));
    setQuestions(list);
  }, []);

  // ─── Timer ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          pushResults();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  // ─── Answer handler ─────────────────────────────────────────────────────
  const handleAnswer = (answer) => {
    if (showNext) return;
    if (!timerActive) setTimerActive(true);

    const current = questions[index];
    const correct = current.correct;
    const isCorrect = answer === correct;

    setSelected(answer);
    setCorrectAnswer(correct);
    setShowNext(true);

    let newMistakes = [...mistakes];

    if (isCorrect) {
      setScore((s) => s + 1);
      setTimeLeft((t) => t + 3);
      setBonusTime("+3 seconds");
      setTimeout(() => setBonusTime(null), 2000);
    } else {
      setLives((l) => l - 1);
      newMistakes.push({
        question: current.country,
        correct,
        wrong: answer,
      });
      setMistakes(newMistakes);
    }

    setTimeout(() => {
      if (lives - (isCorrect ? 0 : 1) <= 0) {
        pushResults(newMistakes);
        return;
      }

      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setSelected(null);
        setCorrectAnswer(null);
        setShowNext(false);
        setDisabledOpts([]);
        setLastCorrect(correct);
      } else {
        pushResults(newMistakes);
      }
    }, 1500);
  };

  // ─── 50/50 helper ───────────────────────────────────────────────────────
  const useFiftyFifty = () => {
    if (fiftyFiftyUsed) return;
    const current = questions[index];
    const wrongs = current.options.filter((o) => o !== current.correct);
    const toDisable = wrongs.sort(() => Math.random() - 0.5).slice(0, 2);
    setDisabledOpts(toDisable);
    setFiftyFiftyUsed(true);
  };

  const currentQ = questions[index];

  // ─── UI ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white transition-all">
      <h1 className="text-3xl font-bold mb-6">🏛️ Guess the Capital</h1>

      {/* Timer */}
      <div className="flex items-center gap-4 mb-6 text-lg relative">
        <span>
          ⏳ Time left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </span>
        {bonusTime && (
          <span className="text-green-400 text-sm animate-fadeInOut absolute -right-24">
            {bonusTime}
          </span>
        )}
      </div>

      {/* Question prompt */}
      {currentQ && (
        <p className="mb-6 text-xl font-semibold">
          What is the capital of <span className="text-yellow-400">{currentQ.country}</span>?
        </p>
      )}

      {/* 50/50 button */}
      {!fiftyFiftyUsed && (
        <button
          onClick={useFiftyFifty}
          className="mb-4 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition"
        >
          🎲 Use 50/50
        </button>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 w-[350px]">
        {currentQ?.options.map((opt) => {
          const disabled = disabledOpts.includes(opt);
          const base =
            "p-4 rounded-lg text-lg font-semibold transition-all duration-500 ease-in-out text-center cursor-pointer";
          const stateClass = showNext
            ? opt === correctAnswer
              ? "bg-green-500 text-white"
              : opt === selected
              ? "bg-red-500 text-white"
              : "bg-gray-700 text-white"
            : disabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-white";
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={disabled}
              className={`${base} ${stateClass}`}
              style={{ minHeight: "88px" }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Badges */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <div className="flex items-center text-xl font-bold px-4 py-3 rounded-lg shadow-md w-36 bg-red-700">
          ❌ {3 - lives}/3
        </div>
        <div className="flex items-center text-xl font-bold px-4 py-3 rounded-lg shadow-md w-36 bg-blue-700">
          🎯 {score}
        </div>
      </div>

      {/* Fade animation */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          10%,
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-5px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s forwards;
        }
      `}</style>
    </div>
  );
}
