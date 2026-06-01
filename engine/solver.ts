// engine/solver.ts

import { Board, Coord } from "./types"
import { revealCell } from "./core"

type Constraint = { cells: string[]; set: Set<string>; need: number }

const key = (r: number, c: number) => `${r},${c}`
const parseKey = (k: string): Coord => {
  const [r, c] = k.split(",").map(Number)
  return { r, c }
}

// build one constraint per revealed number that still has hidden neighbors
function gatherConstraints(board: Board): Constraint[] {
  const rows = board.length, cols = board[0].length
  const out: Constraint[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board[r][c]
      if (!cell.revealed || cell.isMine) continue
      let flaggedCount = 0
      const hidden: string[] = []
      for (const dr of [-1, 0, 1]) for (const dc of [-1, 0, 1]) {
        if (dr === 0 && dc === 0) continue
        const nr = r + dr, nc = c + dc
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
        const n = board[nr][nc]
        if (n.flagged) flaggedCount++
        else if (!n.revealed) hidden.push(key(nr, nc))
      }
      if (hidden.length > 0) {
        out.push({ cells: hidden, set: new Set(hidden), need: cell.adjacent - flaggedCount })
      }
    }
  }
  return out
}

function subsetElimination(board: Board): boolean {
  let changed = false
  const cons = gatherConstraints(board)

  for (const A of cons) {
    for (const B of cons) {
      if (A === B) continue
      if (A.cells.length >= B.cells.length) continue   // proper subset must be smaller
      // A ⊆ B ?
      let subset = true
      for (const k of A.cells) if (!B.set.has(k)) { subset = false; break }
      if (!subset) continue

      const diff = B.cells.filter(k => !A.set.has(k))   // cells in B but not A
      const needDiff = B.need - A.need

      if (needDiff === 0) {                              // leftovers all safe
        for (const k of diff) {
          const { r, c } = parseKey(k)
          if (!board[r][c].revealed && !board[r][c].flagged) {
            board[r][c].revealed = true; changed = true
          }
        }
      } else if (needDiff === diff.length) {             // leftovers all mines
        for (const k of diff) {
          const { r, c } = parseKey(k)
          if (!board[r][c].flagged) {
            board[r][c].flagged = true; changed = true
          }
        }
      }
    }
  }
  return changed
}

function solveOnce(board: Board): boolean {
  let changed = false
  const rows = board.length, cols = board[0].length

  // basic local rules
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board[r][c]
      if (!cell.revealed || cell.isMine) continue

      const neigh: Coord[] = []
      for (const dr of [-1, 0, 1]) for (const dc of [-1, 0, 1]) {
        const nr = r + dr, nc = c + dc
        if (nr === r && nc === c) continue
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) neigh.push({ r: nr, c: nc })
      }
      const flagged = neigh.filter(n => board[n.r][n.c].flagged)
      const hidden  = neigh.filter(n => !board[n.r][n.c].revealed && !board[n.r][n.c].flagged)

      if (flagged.length === cell.adjacent && hidden.length > 0) {
        hidden.forEach(n => { board[n.r][n.c].revealed = true }); changed = true
      }
      if (cell.adjacent - flagged.length === hidden.length && hidden.length > 0) {
        hidden.forEach(n => { board[n.r][n.c].flagged = true }); changed = true
      }
    }
  }

  // subset elimination
  if (subsetElimination(board)) changed = true

  // global mine count
  const totalMines    = board.flat().filter(c => c.isMine).length
  const flaggedTotal  = board.flat().filter(c => c.flagged).length
  const hidden        = board.flat().filter(c => !c.revealed && !c.flagged)
  const minesRemaining = totalMines - flaggedTotal

  if (hidden.length > 0 && minesRemaining === 0) {
    hidden.forEach(c => { c.revealed = true }); changed = true
  } else if (hidden.length > 0 && minesRemaining === hidden.length) {
    hidden.forEach(c => { c.flagged = true }); changed = true
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

  const totalMines = board.flat().filter(c => c.isMine).length

  // iterate logic until no more progress
  while (solveOnce(board)) { 
    const unsound = board.flat().some(c =>
      (c.flagged && !c.isMine) ||   // flagged a safe cell
      (c.revealed && c.isMine)      // revealed a mine
    )
    if (unsound) return false
  }

  // if any safe cell remains hidden, it's unsolvable
  return board.every(row =>
    row.every(c => c.isMine || c.revealed)
  )
}
