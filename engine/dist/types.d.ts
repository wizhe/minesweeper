export type Coord = {
    r: number;
    c: number;
};
export interface Cell {
    isMine: boolean;
    adjacent: number;
    revealed: boolean;
    flagged: boolean;
}
export type Board = Cell[][];
