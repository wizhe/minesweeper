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
        <div className="banner">
          <WinLoseBanner gameStatus={gameStatus} />
        </div>
      <span className="mines">Mines: {bombsLeft}</span>
    </div>
  )
}
