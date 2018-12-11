import {add, cond, drop, equals, head, length, lte, nth, sum, T, take} from 'ramda'

const bonus = rolls => bonusFn(rolls);

const isStrike = rolls => equals(10, head(rolls));
const isSpare = rolls => equals(10, sum(take(2, rolls)));

const bonusFn = cond([
  [rolls => lte(length(rolls), 3), () => 0],
  [isStrike, rolls => add(add(nth(1, rolls), nth(2, rolls)), bonus(drop(1, rolls)))],
  [isSpare, rolls => nth(2, rolls) + bonus(drop(2, rolls))],
  [T, rolls => bonus(drop(2, rolls))],
]);

export const score = (rolls: any = []) => {
  return sum(rolls) + bonus(rolls)
};