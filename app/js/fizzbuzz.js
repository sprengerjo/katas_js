'use strict';

const R = require('ramda');

class FizzBuzz {

    static upTo(n) {
        const s = R.toString
        const f = R.always("fizz");
        const b = R.always("buzz");
        const fb = R.always(f() + b());
        const funs = [s, s, f, s, b, f, s, s, f, b, s, f, s, s, fb];

        const selectFun = n => R.nth(R.modulo(R.dec(n), 15), funs);
        const fizzBuzzify = (n) => R.call(selectFun(n), n);

        return R.map(fizzBuzzify, R.range(1, R.inc(n)));
    }
}

module.exports = FizzBuzz;