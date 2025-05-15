// NewGameButton.tsx

import React from "react";

interface NewGameButtonProps {
  startNewGame: () => void;
}

export default function NewGameButton({ startNewGame }: NewGameButtonProps) {
  return <button 
    onClick={startNewGame}
    title="Regenerates a new game of the same size"
    >
      New Game
    </button>;
}
