// web/src/components/WebGame.tsx

import React, { useState } from "react"
import { useGame }  from "../hooks/useGame"
import Board  from "./Board"
import NewGameButton  from "./controls/NewGameButton";
import DifficultyButtons  from "./controls/DifficultyButtons";
import CodeLoader from "./controls/CodeLoader";
import DailyButton  from "./controls/DailyButton";
import ShareCodeBox from "./controls/ShareCodeBox";
import StatusBar  from "./StatusBar"
import UndoButton from "./controls/UndoButton";
import "../styles/Board.css"
import "../styles/WebGame.css"
import "../styles/LinkBubbles.css";
import LinkBubbles from "./LinkBubbles";
import DailyStatSection from "./DailyStatsSection";

export default function WebGame() {
  const {
    rows, cols, board, shareCode,
    gameStatus, undoAvailable,
    isGenerating, timer, bombsLeft,
    startNewGame, loadGame, setDifficulty, loadDaily,
    onCellClick, onCellContext, onUndo, isDailyMode
  } = useGame({ initRows: 9, initCols: 9, initMines: 10 })

  const [importCode, setImportCode] = useState<string>("");

  // format mm:ss
  const m = Math.floor(timer/60), s = timer%60
  const displayTime = `${m}:${s.toString().padStart(2,"0")}`

  // dynamic border
  const borderStyle =
    gameStatus==="won"  ? "4px solid var(--win-border-color)" :
    gameStatus==="lost" ? "4px solid var(--lose-border-color)" :
                          "4px solid var(--text-color)"

  return (
    <div>
      <div className='header'>
        minesweeper
      </div>
      <div className={`game-container ${gameStatus}`}>
        {/* difficulty */}
        <header className="bar difficulty-bar">
          <DifficultyButtons setDifficulty={setDifficulty} />
        </header>

        {/* daily + code loader */}
        <div className="bar loader-bar">
          <DailyButton loadDaily={loadDaily}/>
          <CodeLoader
            importCode={importCode}
            setImportCode={setImportCode}
            loadGame={loadGame}
          />
        </div>

        {/* status + board + share + undo */}
        <div className="game-board-wrapper" onContextMenu={e => { e.preventDefault(); }}>
          <StatusBar displayTime={displayTime} bombsLeft={bombsLeft}  gameStatus={gameStatus} />
          <Board
            board={board}
            rows={rows}
            cols={cols}
            isGenerating={isGenerating}
            onCellClick={onCellClick}
            onCellContext={onCellContext}
            borderStyle={borderStyle}
          />
          <footer className="bar footer-bar">
            <div className="new-undo-bar" onContextMenuCapture={e => e.preventDefault()}>
              <NewGameButton  startNewGame={startNewGame} />
              <UndoButton onUndo={onUndo} disabled={!undoAvailable}/>
            </div>
            <ShareCodeBox shareCode={shareCode} />
          </footer>
        </div>

        {isDailyMode  && <DailyStatSection />}
      </div>
      <LinkBubbles />
    </div>
  )
}

