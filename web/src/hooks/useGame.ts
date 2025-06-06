// web/src/hooks/useGame.ts

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
  const [seed, setSeed]     = useState<string>(() => { return window.crypto?.randomUUID?.() || Math.random().toString(36).slice(2); });
  const [firstClick, setFirstClick] = useState<Coord|null>(null)
  const [board, setBoard]   = useState<Board>([])
  const [shareCode, setShareCode] = useState("")
  const [gameStatus, setGameStatus] = useState<"playing"|"won"|"lost">("playing")
  const [undoBoard, setUndoBoard]   = useState<Board|null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDailyMode, setIsDailyMode] = useState(false);
  const [losses, setLosses] = useState(0)
  const [hasFlagged, setHasFlagged] = useState(false)

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
    setIsDailyMode(false)
    setLosses(0)
    setHasFlagged(false)
  }, [])

  const loadGame = useCallback((code: string) => {
    const { rows:r, cols:c, mines:m, seed:s, firstClick:fc } = parseShareCode(code)
    setRows(r); setCols(c); setMines(m);
    setSeed(s); setFirstClick(fc);
    setShareCode(code);
    setTimer(0);
    setStarted(true);
    setLosses(0)
    setHasFlagged(false)
  }, [])

  const loadDaily = useCallback(async () => {
    try {
      const url = `${process.env.PUBLIC_URL || ''}/daily-puzzles.json`;
      console.log('[Daily] fetching URL:', url);
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const list = await resp.json()
      if (list.length === 0) throw new Error("No daily puzzles found");
      const today = list[list.length - 1];
      setIsDailyMode(true);
      loadGame(today.code);
    } catch (err) {
      console.error("Failed to load daily puzzle:", err);
    }
  }, [loadGame]);

    function reportDailyStats(stats: {
    date: string;
    userId?: string;
    timeSec: number;
    perfectClear: boolean;
    noFlagClear: boolean;
  }) {
    console.log('[Stats] payload:', stats);
    fetch(`${process.env.REACT_APP_STATS_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(stats)
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(resp => console.log("Stats reported:", resp))
    .catch(err => console.error("Failed to report stats:", err));
  }

  useEffect(() => {
    if (isDailyMode && gameStatus === "won") {
      reportDailyStats({
        date: new Date().toISOString().slice(0, 10),
        timeSec: timer,
        userId:   undefined,
        perfectClear: losses === 0,
        noFlagClear: !hasFlagged
      });
    }
  }, [gameStatus]);

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
    setHasFlagged(true)
    setBoard(copy)
  }

  function onUndo() {
    if (!undoBoard) return
    setBoard(undoBoard)
    setUndoBoard(null)
    setGameStatus("playing")
    setTimer(t => t + 10)  
    setLosses(losses + 1)
    console.log('Losses + 1')
    setStarted(true)
    window.gtag('event', 'undo_move', {
      penalty_seconds: 5
    });
  }

  return {
    rows, cols, mines, board, shareCode,
    gameStatus, undoAvailable: !!undoBoard,
    isGenerating, timer, bombsLeft,
    startNewGame, loadGame, setDifficulty, loadDaily,
    onCellClick, onCellContext, onUndo, isDailyMode
  }
}
