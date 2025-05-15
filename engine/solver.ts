// engine/solver.ts

import { Board, Coord } from "./types"
import { revealCell } from "./core"

// apply logical rules until stuck; return true if any change happened
function solveOnce(board: Board): boolean {
  let changed = false
  const rows = board.length, cols = board[0].length

  // scan every revealed numbered cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board[r][c]
      if (!cell.revealed || cell.isMine) continue

      // collect neighbors
      const neigh: Coord[] = []
      for (let dr of [-1, 0, 1]) for (let dc of [-1, 0, 1]) {
        const nr = r + dr, nc = c + dc
        if (nr === r && nc === c) continue
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          neigh.push({ r: nr, c: nc })
        }
      }

      const flagged = neigh.filter(n => board[n.r][n.c].flagged)
      const hidden  = neigh.filter(n => !board[n.r][n.c].revealed && !board[n.r][n.c].flagged)

      // safe expansion
      if (flagged.length === cell.adjacent && hidden.length > 0) {
        hidden.forEach(n => { board[n.r][n.c].revealed = true })
        changed = true
      }
      // mine marking
      if (cell.adjacent - flagged.length === hidden.length && hidden.length > 0) {
        hidden.forEach(n => { board[n.r][n.c].flagged = true })
        changed = true
      }
    }
  }

  return changed
}

// returns true if the board can be fully solved logically
export function isFullySolvable(
  initialBoard: Board,
  firstClick: Coord
): boolean {
  // deep clone
  const board = initialBoard.map(row => row.map(c => ({ ...c })))
  // reveal first click
  revealCell(board, firstClick.r, firstClick.c)

  // iterate logic until no more progress
  while (solveOnce(board)) { /* repeat */ }

  // if any safe cell remains hidden, it's unsolvable
  return board.every(row =>
    row.every(c => c.isMine || c.revealed)
  )
}
