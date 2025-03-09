"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import countriesData from "../../../../data/countries.json";

export default function GameContent() {
  const searchParams = useSearchParams();
  const selectedContinents = searchParams.get("continents")?.split(",") || [];

  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [currentFlag, setCurrentFlag] = useState("");
  const [usedFlags, setUsedFlags] = useState(new Set());
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [bonusTime, setBonusTime] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    if (timerActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            router.push(`/guess-the-flag/results?score=${score}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive]);

  const generateQuestions = () => {
    let filteredCountries = countriesData.filter((c) =>
      selectedContinents.includes(c.continent)
    );

    let availableFlags = filteredCountries.filter((c) => !usedFlags.has(c.code));

    if (availableFlags.length === 0) {
      router.push(`/guess-the-flag/results?score=${score}`);
      return;
    }

    let shuffled = [...availableFlags].sort(() => Math.random() - 0.5);

    let questionsArray = shuffled.map((country) => {
      let wrongAnswers = filteredCountries
        .filter((c) => c.name !== country.name && c.name !== lastCorrectAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      return {
        image: country.code,
        correct: country.name,
        options: [...wrongAnswers.map((c) => c.name), country.name].sort(
          () => Math.random() - 0.5
        ),
      };
    });

    setQuestions(questionsArray);
    if (questionsArray.length) {
      setCurrentFlag(questionsArray[0].image);
      setUsedFlags(new Set([...usedFlags, questionsArray[0].image]));
    }
  };

  const handleAnswer = (answer) => {
    if (!timerActive) setTimerActive(true);
    if (showNext) return;

    const isCorrect = answer === questions[index].correct;

    setSelected(answer);
    setCorrectAnswer(questions[index].correct);
    setShowNext(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setTimeLeft((prev) => prev + 3);
      setBonusTime("+3 seconds");

      setTimeout(() => {
        setBonusTime(null);
      }, 2000);
    } else {
      setLives((prev) => prev - 1);
    }

    setTimeout(() => {
      if (lives - (isCorrect ? 0 : 1) <= 0) {  // FIX: Nu mai termină jocul la un răspuns corect
        router.push(`/guess-the-flag/results?score=${score}`);
        return;
      }

      if (index + 1 < questions.length) {
        setLastCorrectAnswer(questions[index].correct);
        setIndex((prev) => prev + 1);
        setCurrentFlag(questions[index + 1].image);
        setSelected(null);
        setCorrectAnswer(null);
        setShowNext(false);
      } else {
        router.push(`/guess-the-flag/results?score=${score}`);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white transition-all duration-500">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        🌍 Guess the Flag
      </h1>

      {/* Timer */}
      <div className="relative text-lg mb-6 flex items-center gap-4">
        <span>⏳ Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
        {bonusTime && (
          <span className="text-green-400 text-sm animate-fadeInOut">
            {bonusTime}
          </span>
        )}
      </div>

      {/* Steag - spațiere mărită față de răspunsuri */}
      <div className="relative flex items-center justify-center px-6 mb-6" style={{ height: "250px", maxWidth: "100%" }}>
        <Image
          src={`/flags/${currentFlag}`}
          alt="Flag"
          width={400}
          height={250}
          className="object-contain h-full w-auto max-w-full"
          priority
        />
      </div>

      {/* Container invizibil pentru variante - previne mutarea elementelor */}
      <div className="flex flex-col items-center justify-center w-full mb-10" style={{ minHeight: "120px" }}>
        <div className="grid grid-cols-2 gap-4 w-[350px]">
          {questions[index]?.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`p-4 rounded-lg text-lg font-semibold transition-all duration-500 ease-in-out text-center cursor-pointer ${
                showNext
                  ? option === correctAnswer
                    ? "bg-green-500 text-white"
                    : option === selected
                    ? "bg-red-500 text-white"
                    : "bg-gray-700 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              style={{
                minWidth: "150px",
                maxWidth: "160px",
                wordBreak: "break-word",
                minHeight: "88px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Greseli și scor */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <div className="flex items-center justify-center text-xl font-bold px-6 py-3 rounded-lg shadow-md w-36 text-center bg-red-700 text-white">
          ❌ {3 - lives}/3
        </div>
        <div className="flex items-center justify-center text-xl font-bold px-6 py-3 rounded-lg shadow-md w-36 text-center bg-blue-700 text-white">
          🎯 {score}
        </div>
      </div>
    </div>
  );
}
