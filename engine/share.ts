// engine/share.ts

import { Coord } from "./types"

// create base64‐encoded csv: rows,cols,mines,seed,r,c
export function makeShareCode(
  rows: number, cols: number, mines: number,
  seed: string, firstClick: Coord
): string {
  const raw = [rows, cols, mines, seed, firstClick.r, firstClick.c].join(",")
  return btoa(raw)
}

// decode CSV back into parameters
export function parseShareCode(code: string) {
  const [rs, cs, ms, seed, rr, cc] = atob(code).split(",")
  return {
    rows:        +rs,
    cols:        +cs,
    mines:       +ms,
    seed,
    firstClick: { r: +rr, c: +cc }
  }
}
