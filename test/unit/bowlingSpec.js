describe('bowling', () => {
    var g;
    beforeEach(() => {
        g = new BowlingGame;
    })

    function rollMany(rolls, pins) {
        for (var i = 0; i < rolls; i++) {
            g.roll(pins);
        }
    }

    it("should score 0, if 20 rolls do no hit a pin", () => {
        rollMany(20, 0);
        expect(g.score()).toBe(0);

    });

    it("should score 20, if 20 rolls do hit 1 pin", () => {
        rollMany(20, 1);
        expect(g.score()).toBe(20 * 1);
    });

    it("should add spare bonus", () => {
        g.roll(4);
        g.roll(6);
        rollMany(18, 4);
        expect(g.score()).toBe(4 + 6 + 4 + 18 * 4);
    });

    it("should add strike bonus", () => {
        g.roll(10);
        rollMany(18, 4);
        expect(g.score()).toBe(10 + 4 + 4 + 18 * 4);
    });

    it("should score 300 for a perfect game", () => {
        rollMany(12, 10);
        expect(g.score()).toBe(300);
    });
});
