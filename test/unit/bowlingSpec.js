'use strict';

describe('bowling', function () {
    var g;
    beforeEach(function () {
        g = BowlingGame.create();
    });

    function rollMany(rolls, pins) {
        for (var i = 0; i < rolls; i++) {
            g.roll(pins);
        }
    }

    it("should score 0, if 20 rolls do no hit a pin", function () {
        rollMany(20, 0);
        expect(g.score()).toBe(0);

    });

    it("should score 20, if 20 rolls do hit 1 pin", function () {
        rollMany(20, 1);
        expect(g.score()).toBe(20 * 1);
    });

    it("should add spare bonus", function () {
        g.roll(4);
        g.roll(6);
        rollMany(18, 4);
        expect(g.score()).toBe(4 + 6 + 4 + 18 * 4);
    });

    it("should add strike bonus", function () {
        g.roll(10);
        rollMany(18, 4);
        expect(g.score()).toBe(10 + 4 + 4 + 18 * 4);
    });

    it("should score 300 for a perfect game", function () {
        rollMany(12, 10);
        expect(g.score()).toBe(300);
    });
});
