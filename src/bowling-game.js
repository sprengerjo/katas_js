var BowlingGame = {
    create: function () {
        this.scores = [];
        return Object.create(this);
    },
    scores: [],
    roll: function (pins) {
        this.scores.push(pins);
    },
    score: function () {
        var result = 0;
        var current = 0;
        for (var i = 0; i < 10; i++) {
            if (this.isStrike(current)) {
                result += 10 + this.strikeBonus(current);
                current++;
            } else if (this.isSpare(current)) {
                result += 10 + this.spareBonus(current);
                current += 2;
            } else {
                result += this.sum(current);
                current += 2;
            }
        }
        return result;
    },
    isStrike: function (current) {
        return 10 === this.scores[current];
    },
    isSpare: function (current) {
        return 10 === this.scores[current] + this.scores[current + 1];
    }, sum: function (current) {
        return this.scores[current] + this.scores[current + 1];
    },
    spareBonus: function (current) {
        return this.scores[current + 2];
    },
    strikeBonus: function (current) {
        return this.scores[current + 1] + this.scores[current + 2];
    }
};
