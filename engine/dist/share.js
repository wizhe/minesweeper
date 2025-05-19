"use strict";
// engine/share.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeShareCode = makeShareCode;
exports.parseShareCode = parseShareCode;
// create base64‐encoded csv: rows,cols,mines,seed,r,c
function makeShareCode(rows, cols, mines, seed, firstClick) {
    const raw = [rows, cols, mines, seed, firstClick.r, firstClick.c].join(",");
    return btoa(raw);
}
// decode CSV back into parameters
function parseShareCode(code) {
    const [rs, cs, ms, seed, rr, cc] = atob(code).split(",");
    return {
        rows: +rs,
        cols: +cs,
        mines: +ms,
        seed,
        firstClick: { r: +rr, c: +cc }
    };
}
