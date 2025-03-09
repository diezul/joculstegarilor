"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import countriesData from "../../../../data/countries.json";

function GameContent() {
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

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    let filteredCountries = countriesData.filter((c) =>
      selectedContinents.includes(c.continent)
    );

    let availableFlags = filteredCountries.filter(c => !usedFlags.has(c.code));

    if (availableFlags.length === 0) {
      router.push(`/guess-the-flag/results?score=${score}`);
      return;
    }

    let shuffled = [...availableFlags].sort(() => Math.random() - 0.5);

    let questionsArray = shuffled.map((country) => {
      let wrongAnswers = filteredCountries
        .filter((c) => c.name !== country.name)
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
    if (showNext) return;

    const isCorrect = answer === questions[index].correct;

    setSelected(answer);
    setCorrectAnswer(questions[index].correct);
    setShowNext(true);

    setTimeout(() => {
      if (!isCorrect) {
        setLives((prevLives) => prevLives - 1);
      } else {
        setScore((prevScore) => prevScore + 1);
      }

      if (lives - (isCorrect ? 0 : 1) <= 0) {
        router.push(`/guess-the-flag/results?score=${score}`);
        return;
      }

      if (index + 1 < questions.length) {
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
      <h1 className="text-3xl font-bold mb-4">🌍 Guess the Flag</h1>
      <p className="text-lg">🏆 Score: {score}</p>
      <p className="text-lg">❌ Lives: {3 - lives}/3</p>

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
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <GameContent />
    </Suspense>
  );
}
