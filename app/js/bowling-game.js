let BowlingGame = {
    scores: [],
    create() {
        this.scores = [];
        return Object.create(this);
    },
    roll: function (number) {
        this.scores.push(number);
    },
    score() {
        var frame = 0, current = 0, score = 0;

        function isStrike() {
            return 10 == this.scores[current];
        }

        function isSpare() {
            return 10 == this.scores[current] + this.scores[current + 1];
        }

        function sum() {
            return this.scores[current] + this.scores[current + 1];
        }

        function strikeBonus() {
            return 10 + this.scores[current + 1] + this.scores[current + 2];
        }

        function spareBonus() {
            return 10 + this.scores[current + 2];
        }

        while (frame++ < 10) {
            if (isStrike.call(this)) {
                score += strikeBonus.call(this);
                current++;
            } else if (isSpare.call(this)) {
                score += spareBonus.call(this);
                current += 2;
            } else {
                score += sum.call(this);
                current += 2;
            }
        }
        return score;
    }
};