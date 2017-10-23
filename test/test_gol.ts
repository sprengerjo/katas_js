'use strict';

import * as should from 'should';
import GameOfLife from '../src/gol';

describe.only('game of life', () => {
    let g;

    beforeEach(() => {
        g = GameOfLife;
    });


    it("should assert game rules", () => {
        should(g.isAlive(0, true)).eql(false);
        should(g.isAlive(1, true)).eql(false);
        should(g.isAlive(2, false)).eql(false);
        should(g.isAlive(2, true)).eql(true);
        should(g.isAlive(3, true)).eql(true);
        should(g.isAlive(4, true)).eql(false);
        should(g.isAlive(4, false)).eql(false);
        should(g.isAlive(5, false)).eql(false);
    });

    it("should return empty next generation", () => {
        should(g.nextGeneration([[2, 1]])).eql([]);
    });

    it("should return blinker", () => {
        should(g.nextGeneration([[0, 1], [1, 1], [2, 1]])).eql([[1, 0], [1, 1], [1, 2]]);
        should(g.nextGeneration([[1, 0], [1, 1], [1, 2]])).eql([[0, 1], [1, 1], [2, 1]]);
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

    it("should identify all neighbours of [1 1]", () => {
        should(g.getNeighbours([1, 1])).eql([[0, 0], [0, 1],
            [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
    });
});
