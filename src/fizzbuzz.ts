'use strict';

import * as R from 'ramda';
import {List, Repeat} from 'immutable';

export class FizzBuzz {

    static upToStringZipImuutable(n) {

        const repFlat = (s: List<string>, n: number): any => Repeat(s, n).flatten().take(n);

        const fizz = repFlat(List(['', '', 'fizz']), n);
        const buzz = repFlat(List(['', '', '', '', 'buzz']), n);

        return fizz
            .zipWith((a, b) => a + b, buzz)
            .map((s, i) => R.isEmpty(s) ? R.toString(R.inc(i)) : s)
            .toJS();
    }

    static upToStringZip(n) {
        const replaceBlanksWithNumber = (fb, idx) => R.isEmpty(fb) ? '' + R.inc(idx) : fb;
        const mapIndexed = R.addIndex(R.map);
        const repFlat = (s, n) => R.compose(
            R.take(n),
            R.flatten,
            R.repeat(s))(n);

        return mapIndexed(replaceBlanksWithNumber, R.zipWith(R.concat,
            repFlat(['', '', 'fizz'], n),
            repFlat(['', '', '', '', 'buzz'], n)));
    }

    static upToLookUp(n) {
        const s = R.toString
        const f = R.always('fizz');
        const b = R.always('buzz');
        const fb = R.always(f() + b());
        const funs = [s, s, f, s, b, f, s, s, f, b, s, f, s, s, fb];

        const selectFun: Function = (n) => R.nth(R.modulo(R.dec(n), 15), funs);
        const fizzBuzzify = (n) => R.call(selectFun(n), n);

        return R.map(fizzBuzzify, R.range(1, R.inc(n)));
    }

    static upToConditional(n) {
        const isModuloOf = mod => i => i % mod === 0;
        const fb = R.cond([
            [isModuloOf(15), R.always('fizzbuzz')],
            [isModuloOf(5), R.always('buzz')],
            [isModuloOf(3), R.always('fizz')],
            [R.T, i => '' + i]
        ]);

        return R.map(fb, R.range(1, R.inc(n)));
	}

    static upToPipeline(n) {
		const isModuloOf = mod => (i: any): boolean => i % mod === 0;
		const apply = (m, s) => R.when(isModuloOf(m), R.always(s))

		const fizzBuzz = apply(15, 'fizzbuzz')
		const fizz = apply(3, 'fizz')
		const buzz = apply(5, 'buzz')

		const fizzbuzzPipeline = R.pipe(fizzBuzz, fizz, buzz, (i) => '' + i)

        return R.map(fizzbuzzPipeline, R.range(1, R.inc(n)));
    }
}
