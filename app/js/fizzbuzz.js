'use strict';

const R = require('ramda');

class FizzBuzz {

    static upTo(n) {
        const replaceBlanksWithNumber = (fb, idx) => R.isEmpty(fb) ? "" + R.inc(idx) : fb;
        const mapIndexed = R.addIndex(R.map);
        const repFlat = (s, n) => R.compose(
            R.take(n),
            R.flatten,
            R.repeat(s))(n);

        return mapIndexed(replaceBlanksWithNumber, R.zipWith(R.concat,
                repFlat(["", "", "fizz"], n),
                repFlat(["", "", "", "", "buzz"], n)));
    }
}

module.exports = FizzBuzz;