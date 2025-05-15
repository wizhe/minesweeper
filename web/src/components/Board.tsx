// web/src/components/Board.tsx

import React, { useRef } from "react"
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
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didHold   = useRef(false)
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
            // START hold‐to‐flag handlers
            onPointerDown={e => {
            if (e.pointerType === 'mouse' && e.button !== 0) return
            didHold.current = false
            holdTimer.current = setTimeout(() => {
              onCellContext(r, c)            // toggle flag
              didHold.current = true
              }, 150)                        // 0.15s hold
            }}
            onPointerUp={e => {
            if (e.pointerType === 'mouse' && e.button !== 0) return
            // clear pending flag‐toggle if released early
            if (holdTimer.current) {
              clearTimeout(holdTimer.current)
              holdTimer.current = null
            }
            // if you didn’t hold long enough, treat as a normal click
            if (!didHold.current) {
              onCellClick(r, c)
            }
            }}
            onPointerLeave={() => {
            // cancel if you drag off the cell
            if (holdTimer.current) {
              clearTimeout(holdTimer.current)
              holdTimer.current = null
            }
            }}
            onContextMenu={e => {
              e.preventDefault()
              onCellContext(r, c)
            }}
            // END hold‐to‐flag handlers
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
