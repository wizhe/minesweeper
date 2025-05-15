import { Coord } from "./types";
export declare function makeShareCode(rows: number, cols: number, mines: number, seed: string, firstClick: Coord): string;
export declare function parseShareCode(code: string): {
    rows: number;
    cols: number;
    mines: number;
    seed: string;
    firstClick: {
        r: number;
        c: number;
    };
};
