// DifficultyButtons.tsx

import React from "react";

type Difficulty = "easy" | "medium" | "hard" | "extraHard" | "random";

interface DifficultyButtonsProps {
  setDifficulty: (difficulty: Difficulty) => void;
}

export default function DifficultyButtons({ setDifficulty }: DifficultyButtonsProps) {
  return (
    <>
      <button onClick={() => setDifficulty("easy")} style={{ background: "#dfd" }}> Easy </button>
      <button onClick={() => setDifficulty("medium")} style={{ background: "#ff0" }}> Medium </button>
      <button onClick={() => setDifficulty("hard")} style={{ background: "#ffb0b0" }}> Hard </button>
      <button onClick={() => setDifficulty("extraHard")} style={{ background: "#f88" }}> X-Hard </button>
      <button onClick={() => setDifficulty("random")} style={{ background: "#f8f" }}> Random </button>
    </>
  );
}