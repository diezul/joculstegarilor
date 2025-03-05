"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import countriesData from "../../../data/countries.json";

export default function Game() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [currentFlag, setCurrentFlag] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showBonusTime, setShowBonusTime] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const generateQuestions = () => {
    let shuffled = [...countriesData].sort(() => Math.random() - 0.5);

    let questionsArray = shuffled.map((country) => {
      let wrongAnswers = countriesData
        .filter((c) => c.name !== country.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      let options = [...wrongAnswers.map((c) => c.name), country.name].sort(
        () => Math.random() - 0.5
      );

      return {
        image: country.code,
        correct: country.name,
        options,
      };
    });

    setQuestions(questionsArray);
    if (questionsArray.length) setCurrentFlag(questionsArray[0].image);
  };

  const handleAnswer = (answer) => {
    if (showNext) return;

    if (!timerRunning) {
      setTimerRunning(true);
    }

    const isCorrect = answer === questions[index].correct;

    setSelected(answer);
    setCorrectAnswer(questions[index].correct);
    setShowNext(true);

    setTimeout(() => {
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        setTimeLeft((prevTime) => prevTime + 3);

        // Afișare "+3 secunde"
        setShowBonusTime(true);
        setTimeout(() => setShowBonusTime(false), 2000);
      } else {
        setLives((prevLives) => prevLives - 1);
      }

      if (lives - (isCorrect ? 0 : 1) <= 0) {
        setTimeout(() => {
          router.push(`/results?score=${score}`);
        }, 500);
        return;
      }

      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1);
        setCurrentFlag(questions[index + 1].image);
        setSelected(null);
        setCorrectAnswer(null);
        setShowNext(false);
      } else {
        setTimeout(() => {
          router.push(`/results?score=${score}`);
        }, 500);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white transition-all duration-500">
      <h1 className="text-4xl font-bold mb-4">🌍 Jocul Stegarilor</h1>

      {/* Timer + Bonus Time */}
      <div className="flex flex-col items-center relative mb-6">
        <p className="text-lg">
          ⏳ Timp rămas: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
        {showBonusTime && (
          <span className="absolute top-7 text-green-400 text-sm opacity-100 transition-opacity duration-1000">
            +3 secunde
          </span>
        )}
      </div>

      {/* Spațiu între timp și steag */}
      <div className="h-6"></div>

      {/* Container steaguri */}
      <div className="relative flex items-center justify-center h-[250px] w-auto mb-6">
        <Image
          src={`/flags/${currentFlag}`}
          alt="Flag"
          width={400}
          height={250}
          className="object-contain h-[250px] w-auto"
          priority
        />
      </div>

      {/* Butoane cu răspunsurile */}
      <div className="grid grid-cols-2 gap-4 w-[350px]">
        {questions[index]?.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`p-4 rounded-lg text-lg font-semibold transition-all duration-500 ease-in-out text-center break-words cursor-pointer ${
              showNext
                ? option === correctAnswer
                  ? "bg-green-500 text-white"
                  : option === selected
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            } ${showNext ? "pointer-events-none" : ""}`}
            style={{
              minWidth: "150px",
              maxWidth: "160px",
              wordBreak: "break-word",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Greseli și scor */}
      <div className="flex justify-between items-center mt-10 w-[350px]">
        <div className="flex items-center justify-center text-xl font-bold px-4 py-3 rounded-lg shadow-md w-36 bg-red-700 text-white">
          ❌ {3 - lives}/3
        </div>
        <div className="flex items-center justify-center text-xl font-bold px-4 py-3 rounded-lg shadow-md w-36 bg-blue-700 text-white">
          🎯 {score}
        </div>
      </div>
    </div>
  );
}
