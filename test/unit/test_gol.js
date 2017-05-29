'use strict';

const should = require('should');

const GameOfLife = require('./../../app/js/gol');

describe('game of life', () => {
    let g;

    beforeEach(() => {
        g = new GameOfLife();
    });

    it("should return empty array for empty cell", () => {
        should(g.getNeighbours([])).be.empty();
    });

    it("should return empty array for empty cell", () => {
        should(g.getNeighbours(null)).be.Array();
    });

    it("should return empty array for empty cell", () => {
        should(g.getNeighbours()).eql([]);
    });

    it("should identify all neighbours of [1 1]", () => {
        should(g.getNeighbours([1, 1])).eql([[0, 0], [0, 1],
            [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
    });
});
