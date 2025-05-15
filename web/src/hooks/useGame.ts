// web/src/hooks/useGame.tsx

import { useState, useEffect, useCallback } from "react"
import {
  Board, Coord,
  generateSolvableBoardConstructive,
  revealCell, toggleFlag, chord,
  makeShareCode, parseShareCode
} from "minesweeper-engine"

export type Difficulty = "easy"|"medium"|"hard"|"extraHard"|"random"

interface UseGameParams { initRows: number; initCols: number; initMines: number }
interface GameControls {
  startNewGame(): void
  loadGame(code: string): void
  loadDaily(code: string): void
  setDifficulty(diff: Difficulty): void
  onCellClick(r: number, c: number): void
  onCellContext(r: number, c: number): void
  onUndo(): void
}

export function useGame({ initRows, initCols, initMines }: UseGameParams) {
  // state
  const [rows, setRows]     = useState(initRows)
  const [cols, setCols]     = useState(initCols)
  const [mines, setMines]   = useState(initMines)
  const [seed, setSeed]     = useState("")
  const [firstClick, setFirstClick] = useState<Coord|null>(null)
  const [board, setBoard]   = useState<Board>([])
  const [shareCode, setShareCode] = useState("")
  const [gameStatus, setGameStatus] = useState<"playing"|"won"|"lost">("playing")
  const [undoBoard, setUndoBoard]   = useState<Board|null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // timer & flags
  const [timer, setTimer] = useState(0)
  const [started, setStarted] = useState(false)
  const flagsPlaced = board.flat().filter(c => c.flagged).length
  const bombsLeft   = mines - flagsPlaced

  // timer effect
  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setTimer(t=>t+1), 1000)
    return () => clearInterval(id)
  }, [started])
  // stop on win/lose
  useEffect(() => {
    if (gameStatus !== "playing") setStarted(false)
  }, [gameStatus])

  // generate on firstClick
  useEffect(() => {
    if (!firstClick) return
    setIsGenerating(true)
    setTimeout(() => {
      const b = generateSolvableBoardConstructive(rows, cols, mines, seed, firstClick)
      revealCell(b, firstClick.r, firstClick.c)
      setBoard(b)
      setSeed(seed)  // seed unchanged here
      setShareCode(makeShareCode(rows, cols, mines, seed, firstClick))
      setGameStatus("playing")
      setUndoBoard(null)
      setIsGenerating(false)
      setStarted(true)
    }, 20)
  }, [firstClick, rows, cols, mines, seed])

  // controls
  const startNewGame = useCallback(() => {
    const newSeed = window.crypto.randomUUID?.() || Math.random().toString(36).slice(2)
    setSeed(newSeed)
    setFirstClick(null)
    setBoard([])
    setShareCode("")
    setGameStatus("playing")
    setUndoBoard(null)
    setTimer(0)
    setStarted(false)
  }, [])

  const loadGame = useCallback((code: string) => {
    const { rows:r, cols:c, mines:m, seed:s, firstClick:fc } = parseShareCode(code)
    setRows(r); setCols(c); setMines(m);
    setSeed(s); setFirstClick(fc);
    setShareCode(code);
    setTimer(0);
    setStarted(true);
  }, [])

  const setDifficulty = useCallback((diff: Difficulty) => {
    window.gtag('event', 'select_content', {
      content_type: 'difficulty',
      item_id: diff,
      });
    switch(diff) {
      case "easy":     setRows(9);  setCols(9);  setMines(10); break
      case "medium":   setRows(12); setCols(12); setMines(26); break
      case "hard":     setRows(16); setCols(16); setMines(64); break
      case "extraHard":setRows(20); setCols(20); setMines(140); break
      case "random":
        const rr = 12 + Math.floor(Math.random()*11)
        const cc = 12 + Math.floor(Math.random()*11)
        setRows(rr); setCols(cc)
        setMines(Math.floor(rr*cc*((Math.random()*0.2)+0.2)))
        break
    }

    startNewGame()
  }, [startNewGame])

  // cell handlers
  function onCellClick(r: number, c: number) {
    if (!firstClick) {
      setFirstClick({ r, c }); return
    }
    if (isGenerating || gameStatus !== "playing") return

    const copy = board.map(row=>row.map(cell=>({ ...cell })))
    const cell = copy[r][c]

    const orig = board[r][c]
    if (orig.flagged) return

    // chord
    if (cell.revealed) {
      chord(copy, r, c)
      // check mine reveal
      if (copy.some(row => row.some(cc=>cc.isMine && cc.revealed))) {
        setUndoBoard(board)
        setBoard(copy)
        setGameStatus("lost")
        return
      }
    } else if (cell.isMine) {
      setUndoBoard(board)
      revealCell(copy, r, c)
      setBoard(copy)
      setGameStatus("lost")
      return
    } else {
      revealCell(copy, r, c)
    }

    setBoard(copy)
    // win check
    if (copy.every(row=>row.every(c=>c.isMine||c.revealed))) {
      setGameStatus("won")
    }
  }

  function onCellContext(r: number, c: number) {
    if (!firstClick || isGenerating || gameStatus!=="playing") return
    const copy = board.map(row=>row.map(cell=>({ ...cell })))
    toggleFlag(copy, r, c)
    setBoard(copy)
  }

  function onUndo() {
    if (!undoBoard) return
    setBoard(undoBoard)
    setUndoBoard(null)
    setGameStatus("playing")
    setTimer(t => t + 5)  
    setStarted(true)
    window.gtag('event', 'undo_move', {
      penalty_seconds: 5
    });
  }

  return {
    // state
    rows, cols, mines, board, shareCode,
    gameStatus, undoAvailable: !!undoBoard,
    isGenerating, timer, bombsLeft,
    // actions
    startNewGame, loadGame, setDifficulty,
    onCellClick, onCellContext, onUndo
  }
}
