"use client";

import { useState } from "react";
import random from "@/lib/actions/random";
import catchPokemon from "@/lib/actions/catch";

export default function Guesser({
  pokemon,
}: {
  pokemon: {
    id: number;
    name: string;
    type: string;
  };
}) {
  console.log(pokemon.name);
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setCorrect(true);
      setShowResult(true);
      catchPokemon({ guessedPokemon: pokemon }).then(() => {
        setShowResult(false);
        setGuess("");
      });
    } else {
      setCorrect(false);
      setGuess("");
      setShowResult(true);
      await sleep(3000);
      setShowResult(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center font-silk">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          className="border border-gray-300 rounded p-2"
          placeholder="Enter your guess"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Catch!
        </button>
        <button
          className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
          onClick={() => random()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m214.2 213.1l-.5.5h-.1l-.5.5l-.3.2l-.4.3l-.3.2l-.3.2h-.4l-.3.2h-.4l-.4.2H168a8 8 0 0 1 0-16h20.7L42.3 53.7a8.1 8.1 0 0 1 11.4-11.4L200 188.7V168a8 8 0 0 1 16 0v40.8a.4.4 0 0 0-.1.3a.9.9 0 0 1-.1.5v.3a.8.8 0 0 0-.1.4l-.2.4c0 .1-.1.2-.1.4l-.2.3c0 .1-.1.2-.1.4l-.2.3l-.2.3l-.3.4Zm-63.6-99.7a8 8 0 0 0 5.7-2.4L200 67.3V88a8 8 0 0 0 16 0V47.2a.4.4 0 0 1-.1-.3a.9.9 0 0 0-.1-.5v-.3a.8.8 0 0 1-.1-.4c-.1-.1-.1-.3-.2-.4s-.1-.2-.1-.4l-.2-.3c0-.1-.1-.2-.1-.4s-.2-.2-.2-.3s-.2-.2-.2-.3l-.3-.4l-.2-.3l-.5-.5h-.1c-.2-.2-.4-.3-.5-.5l-.3-.2l-.4-.3l-.3-.2l-.3-.2h-.4l-.3-.2h-.4l-.4-.2H168a8 8 0 0 0 0 16h20.7L145 99.7a7.9 7.9 0 0 0 0 11.3a7.7 7.7 0 0 0 5.6 2.4ZM99.7 145l-57.4 57.3a8.1 8.1 0 0 0 0 11.4a8.2 8.2 0 0 0 11.4 0l57.3-57.4A8 8 0 0 0 99.7 145Z"
            />
          </svg>
        </button>
      </div>
      <span className={`text-xs`}>
        You can only catch the Pokémon if you guess its name correctly!
      </span>
      {showResult && (
        <div
          className={`text-xs ${correct ? "text-green-500" : "text-red-500"}`}
        >
          {correct
            ? `${pokemon.name} has been caught!`
            : "You missed it! Try again!"}
        </div>
      )}
    </div>
  );
}
