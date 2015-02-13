class BowlingGame {
    constructor() {
        this.scores = [];
    }

    roll(number) {
        this.scores.push(number);
    }

    score() {
        var frame = 0, current = 0, score = 0, that = this;

        function isStrike() {
            return 10 == that.scores[current];
        }

        function isSpare() {
            return 10 == that.scores[current] + that.scores[current + 1];
        }

        function sum() {
            return that.scores[current] + that.scores[current + 1];
        }

        function strikeBonus() {
            return 10 + that.scores[current + 1] + that.scores[current + 2];
        }

        function spareBonus() {
            return 10 + that.scores[current + 2];
        }

        while (frame++ < 10) {
            if (isStrike()) {
                score += strikeBonus();
                current++;
            } else if (isSpare()) {
                score += spareBonus();
                current += 2;
            } else {
                score += sum();
                current += 2;
            }
        }
        return score;
    }
}
;