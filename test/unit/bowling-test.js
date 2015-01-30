var BowlingGameTest = TestCase("BowlingGameTest", {

    setUp: function () {
        g = BowlingGame.create();
    },

    rollMany: function (times, pins) {
        for (var i = 0; i < times; i++)
            g.roll(pins);
    },

    testGutterGame: function () {
        this.rollMany(20, 0);
        assertEquals(0, g.score());
    },

    testOneGames: function () {
        this.rollMany(20, 1);
        assertEquals(20, g.score());
    },

    testSpareBonusMustBeAdded: function () {
        g.roll(5);
        g.roll(5);
        this.rollMany(18, 1);
        assertEquals(5 + 5 + 1 + 18 * 1, g.score());
    },
    testStrikeBonusMustBeAdded: function () {
        g.roll(10);
        this.rollMany(18, 1);
        assertEquals(10 + 1 + 1 + 18 * 1, g.score());
    },
    testPerfectGameMustScore300: function () {
        this.rollMany(12, 10);
        assertEquals(300, g.score());
    }
});