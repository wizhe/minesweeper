"use strict";
// engine/generator.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSolvableBoardConstructive = generateSolvableBoardConstructive;
const seedrandom_1 = __importDefault(require("seedrandom"));
const solver_1 = require("./solver");
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
function generateSolvableBoardConstructive(rows, cols, mines, seed, firstClick) {
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
    const rng = (0, seedrandom_1.default)(seed);
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
        if ((0, solver_1.isFullySolvable)(board, firstClick)) {
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
