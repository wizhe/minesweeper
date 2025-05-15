// web/src/components/Board.tsx

import React from "react"
import { Board as BoardType } from "minesweeper-engine"

interface BoardProps {
  board: BoardType
  onCellClick(r: number, c: number): void
  onCellContext(r: number, c: number): void
  isGenerating: boolean
  rows: number
  cols: number
  borderStyle: string
}

export default function Board({
  board, onCellClick, onCellContext,
  isGenerating, rows, cols, borderStyle
}: BoardProps) {
  const display = board.length
    ? board
    : Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          isMine: false, adjacent: 0, revealed: false, flagged: false
        }))
      )

  return (
    <div
      className="board"
      style={{
        display:       "inline-grid",
        gridTemplate:  `repeat(${rows}, 32px) / repeat(${cols}, 32px)`,
        gap:           "2px",
        opacity:       isGenerating ? 0.5 : 1,
        border:        borderStyle,
        boxSizing:     "border-box"
      }}
    >
      {display.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`cell ${cell.revealed ? "revealed" : ""}`}
            style={{ userSelect: 'none' }}
            onClick={e => { e.preventDefault(); onCellClick(r, c) }}
            onContextMenu={e => { e.preventDefault(); onCellContext(r, c) }}
          >
            {cell.revealed
              ? (cell.isMine ? "💣" : cell.adjacent || "")
              : (cell.flagged ? "🚩" : "")}
          </div>
        ))
      )}
    </div>
  )
}
