'use strict';

import * as R from 'ramda';

import {QuickSort} from '../src/quick_sort';

const sort = QuickSort.sort;

describe('quickly sort list', () => {

    it('should return sorted inputs', () => {
        expect(sort([])).toEqual([]);
        expect(sort([1])).toEqual([1]);
        expect(sort([2, 1])).toEqual([1, 2]);
        expect(sort([1, 2])).toEqual([1, 2]);
        expect(sort([1, 2, 3])).toEqual([1, 2, 3]);
        expect(sort([1, 3, 2])).toEqual([1, 2, 3]);
        expect(sort([2, 1, 3])).toEqual([1, 2, 3]);
        expect(sort([2, 3, 1])).toEqual([1, 2, 3]);
        expect(sort([3, 2, 1])).toEqual([1, 2, 3]);
        expect(sort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    it('should assert many', () => {
        const n = 50000;
        const unsorted = R.times(() => Math.floor(Math.random() * (n - 1 + 1) + 1), n);

        const sorted = sort(unsorted);
        let ramdaSorted = R.sort(R.subtract, unsorted);

        expect(sorted).toEqual(ramdaSorted);
    });
});
