'use strict';
import * as R from 'ramda';

export default class GameOfLife {

    static nextGeneration(cells: [number[]]) {
        const destructIdentity = (value: string) => R.map(Number.parseInt, R.split(',', value));
        const fn = (key: any, value: any) => {
            return GameOfLife.isAlive(value, R.contains(destructIdentity(key), cells));
        };


        const nextGen = R.compose(
            R.map(destructIdentity),
            R.keys,
            cs => GameOfLife.filterWithKeys(fn, cs),
            R.countBy((cell: Number) => R.identity(cell.toString())),
            R.chain(GameOfLife.getNeighbours)
        )(cells);

        return nextGen;
    }

    public static getNeighbours(cell: number []): any [] {
        const neighbours = [];

        if (GameOfLife.isValid(cell)) {
            const d = [1, 0, -1];
            for (let i in d) {
                for (let j in d) {
                    if (d[i] === 0 && d[j] === 0) {
                        continue;
                    }
                    const c = [cell[0] - d[i], cell[1] - d[j]];
                    neighbours.push(c);
                }
            }
        }
        return neighbours;
    }

    public static isAlive(number: number, alive: boolean) {
        return number === 3 || number === 2 && alive;
    }

    private static isValid(cell: number []): boolean {
        return cell !== undefined && cell !== null && cell.length > 0;
    }

    private static filterWithKeys(pred: any, obj: any) {
        return R.pipe(
            R.toPairs,
            R.filter((val: any) => R.apply(pred, val)),
            R.fromPairs
        )(obj);
    }
}
