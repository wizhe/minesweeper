// engine/core.ts
// reveal a cell and flood‐fill
export function revealCell(board, r, c) {
    const cell = board[r][c];
    if (cell.revealed || cell.flagged)
        return;
    cell.revealed = true;
    if (!cell.isMine && cell.adjacent === 0) {
        for (let dr of [-1, 0, 1]) {
            for (let dc of [-1, 0, 1]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < board.length &&
                    nc >= 0 && nc < board[0].length) {
                    revealCell(board, nr, nc);
                }
            }
        }
    }
}
// toggle flag
export function toggleFlag(board, r, c) {
    const cell = board[r][c];
    if (!cell.revealed)
        cell.flagged = !cell.flagged;
}
// chord (auto‐clear) around a revealed number
export function chord(board, r, c) {
    const cell = board[r][c];
    if (!cell.revealed)
        return;
    // collect neighbors
    const neigh = [];
    for (let dr of [-1, 0, 1])
        for (let dc of [-1, 0, 1]) {
            const nr = r + dr, nc = c + dc;
            if (dr === 0 && dc === 0)
                continue;
            if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {
                neigh.push({ r: nr, c: nc });
            }
        }
    // count flagged
    const flaggedCount = neigh.filter(n => board[n.r][n.c].flagged).length;
    if (flaggedCount !== cell.adjacent)
        return;
    neigh.forEach(n => {
        const nc = board[n.r][n.c];
        if (!nc.revealed && !nc.flagged)
            revealCell(board, n.r, n.c);
    });
}
