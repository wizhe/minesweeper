// web/src/components/StatusBar.tsx

import React from "react"
import WinLoseBanner, { GameStatus } from "./WinLoseBanner"

interface StatusBarProps {
  displayTime: string
  bombsLeft:   number
  gameStatus: GameStatus;
}

export default function StatusBar({ displayTime, bombsLeft, gameStatus}: StatusBarProps) {
  return (
    <div className="status-bar">
      <span className="timer">Time: {displayTime} </span>
        <div className="win-lose-banner-container">
          <WinLoseBanner gameStatus={gameStatus} />
        </div>
      <span className="bombs left">Bombs: {bombsLeft}</span>
    </div>
  )
}
