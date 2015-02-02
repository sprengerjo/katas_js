'use strict';

describe('game of life', () => {
    var g;
    beforeEach( () => {
        g = GameOfLife.create();
    });

    it("should return empty array for empty cell", () => {
        expect(g.getNeighbours([])).toBeEmptyArray();
    }),

    it("should return empty array for empty cell", () => {
        expect(g.getNeighbours(null)).toBeEmptyArray();
    }),

    it("should return empty array for empty cell", () => {
        expect(g.getNeighbours()).toBeEmptyArray();
    }),

    it("should identify all neighbours of [1 1]", () => {
        expect(g.getNeighbours([1, 1])).toEqual([[0, 0], [0, 1],
            [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
    });
});
