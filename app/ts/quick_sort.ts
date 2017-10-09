import * as R from 'ramda';

export class QuickSort {

    public static sort(unsorted: number [] = []): number[] {

        if (unsorted.length !== 0) {
            const sorted = [];
            const m = R.head(unsorted);

            const {l, h} = R.groupBy(curr => R.gte(curr, m) ? 'h' : 'l', R.drop(1, unsorted))

            sorted.push(...QuickSort.sort(l));
            sorted.push(m);
            sorted.push(...QuickSort.sort(h));
            return sorted;
        } else
            return unsorted;
    }
}
