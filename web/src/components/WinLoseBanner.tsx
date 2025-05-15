// web/src/components/Banner.tsx

import React from "react";

export type GameStatus = "playing" | "won" | "lost";

interface WinLoseBannerProps {
  gameStatus: GameStatus;
}

export default function WinLoseBanner({ gameStatus }: WinLoseBannerProps) {
  let message = "";
  if (gameStatus === "won")  message = "🎉 You won! 🎉";
  if (gameStatus === "lost") message = "💥 You lost! 💥";
  if (gameStatus === "playing") return null;

  return (
    <div className={`win-lose-banner-${gameStatus}`}>
      {message}
    </div>
  );
}

