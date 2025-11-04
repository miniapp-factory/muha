"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share } from "./share";

type Pokemon = {
  name: string;
  image: string;
};

const pokemons: Pokemon[] = [
  { name: "Pikachu", image: "/pikachu.png" },
  { name: "Charizard", image: "/charizard.png" },
  { name: "Bulbasaur", image: "/bulbasaur.png" },
  { name: "Squirtle", image: "/squirtle.png" },
  { name: "Eevee", image: "/eevee.png" },
];

const questions = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    question: "What is your favorite type of music?",
    options: ["Rock", "Pop", "Classical", "Jazz"],
  },
  {
    question: "What is your favorite hobby?",
    options: ["Reading", "Gaming", "Cooking", "Sports"],
  },
  {
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird", "Fish"],
  },
  {
    question: "What is your favorite season?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
  },
];

export function Quiz() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [result, setResult] = useState<Pokemon | null>(null);

  const handleAnswer = (qIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = option;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {};
    pokemons.forEach((p) => (scores[p.name] = 0));

    answers.forEach((answer, idx) => {
      if (!answer) return;
      const pokemonIndex = idx % pokemons.length;
      const pokemonName = pokemons[pokemonIndex].name;
      scores[pokemonName] += 1;
    });

    const best = pokemons.reduce((prev, curr) => {
      return scores[curr.name] > scores[prev.name] ? curr : prev;
    });

    setResult(best);
  };

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <span className="font-semibold">{q.question}</span>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt) => (
              <Button
                key={opt}
                variant={answers[idx] === opt ? "secondary" : "outline"}
                onClick={() => handleAnswer(idx, opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={calculateResult} disabled={answers.includes("")}>
        Submit
      </Button>
      {result && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <h2 className="text-xl font-bold">
            You are most similar to {result.name}!
          </h2>
          <img src={result.image} alt={result.name} width={200} height={200} />
          <Share
            text={`I am most similar to ${result.name}! Check it out at ${process.env.NEXT_PUBLIC_URL}`}
          />
        </div>
      )}
    </div>
  );
}
