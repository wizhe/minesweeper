// engine/generator.ts
import seedrandom from "seedrandom";
import { isFullySolvable } from "./solver";
// neighbor offsets
const OFFSETS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];
// empty board
function makeEmptyBoard(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({
        isMine: false, adjacent: 0, revealed: false, flagged: false
    })));
}
// update adjacency counts
function bumpAdjacent(board, r, c, delta) {
    for (const [dr, dc] of OFFSETS) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {
            board[nr][nc].adjacent += delta;
        }
    }
}
// place `mines` one‐by‐one (skipping safe zone),
// keeping each placement only if `isFullySolvable` still holds.
export function generateSolvableBoardConstructive(rows, cols, mines, seed, firstClick) {
    const board = makeEmptyBoard(rows, cols);
    // safe zone
    const safe = new Set();
    safe.add(`${firstClick.r},${firstClick.c}`);
    for (const [dr, dc] of OFFSETS) {
        const nr = firstClick.r + dr, nc = firstClick.c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            safe.add(`${nr},${nc}`);
        }
    }
    // pool of candidate coords
    const pool = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!safe.has(`${r},${c}`))
                pool.push({ r, c });
        }
    }
    // shuffle with seed
    const rng = seedrandom(seed);
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // place mines one at a time
    let placed = 0;
    for (const { r, c } of pool) {
        if (placed >= mines)
            break;
        // try
        board[r][c].isMine = true;
        bumpAdjacent(board, r, c, +1);
        if (isFullySolvable(board, firstClick)) {
            placed++;
        }
        else {
            // revert
            board[r][c].isMine = false;
            bumpAdjacent(board, r, c, -1);
        }
    }
    if (placed < mines) {
        console.warn(`Could only place ${placed}/${mines} mines.`);
    }
    return board;
}
