'use strict';

import GameOfLife from '../src/gol';

describe('game of life', () => {
    let g;

    beforeEach(() => {
        g = GameOfLife;
    });


    it("should assert game rules", () => {
        expect(g.isAlive(0, true)).toEqual(false);
        expect(g.isAlive(1, true)).toEqual(false);
        expect(g.isAlive(2, false)).toEqual(false);
        expect(g.isAlive(2, true)).toEqual(true);
        expect(g.isAlive(3, true)).toEqual(true);
        expect(g.isAlive(4, true)).toEqual(false);
        expect(g.isAlive(4, false)).toEqual(false);
        expect(g.isAlive(5, false)).toEqual(false);
    });

    it("should return empty next generation", () => {
        expect(g.nextGeneration([[2, 1]])).toEqual([]);
    });

    it("should return blinker", () => {
        expect(g.nextGeneration([[0, 1], [1, 1], [2, 1]])).toEqual([[1, 0], [1, 1], [1, 2]]);
        expect(g.nextGeneration([[1, 0], [1, 1], [1, 2]])).toEqual([[0, 1], [1, 1], [2, 1]]);
    });

    it("should return empty array for empty cell", () => {
        expect(g.getNeighbours([])).toEqual([]);
    });

    it("should return empty array for empty cell", () => {
        expect(g.getNeighbours(null)).toBeInstanceOf(Array);
    });

    it("should return empty array for empty cell", () => {
        expect(g.getNeighbours()).toEqual([]);
    });

    it("should identify all neighbours of [1 1]", () => {
        expect(g.getNeighbours([1, 1])).toEqual([[0, 0], [0, 1],
            [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
    });

    it("should identify all neighbours of [1 1]", () => {
        expect(g.getNeighbours([1, 1])).toEqual([[0, 0], [0, 1],
            [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
    });
});
