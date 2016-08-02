const R = require('ramda');

module.exports = class Bowling {

    constructor() {
        this._score = [];
    }

    roll(pins) {
        this._score.push(pins);
    }

    score() {
        return R.add(R.sum(this._score), calcBonus(this._score));

        function calcBonus(scores) {
            let bonus = 0;

            const calc = R.until(
                R.isEmpty,
                R.cond([
                    [isStrike, R.pipe(addStrikeBonus, R.drop(1))],
                    [isSpare, R.pipe(addSpareBonus, R.drop(2))],
                    [R.T, R.drop(2)]
                ]));

            calc(scores);

            return bonus;

            function addStrikeBonus(scores) {
                bonus += scores[1] + scores[2];
                return scores;
            }

            function addSpareBonus(scores) {
                bonus += scores[2];
                return scores;
            }

            function isStrike(scores) {
                return scores[0] === 10 && scores.length > 3;
            }
            
            function isSpare(scores) {
                return scores[0] + scores[1] === 10;
            }
        }
    }
} 