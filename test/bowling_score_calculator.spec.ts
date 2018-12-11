import {score} from '../src/bowling_score_calculator'

import {always, concat, times} from 'ramda'

describe('bowling game calculator', () => {

  it('undefineds score is 0', () => {
    expect(score(undefined)).toEqual(0)
  });

  it('0 pin games score is 0', () => {
    const rolls = times(always(0), 20);
    expect(score(rolls)).toEqual(0)
  });

  it('1 pin games score is 20', () => {
    const rolls = times(always(1), 20);
    expect(score(rolls)).toEqual(20)
  });

  it('1 spare bonus must be added', () => {
    const rolls = concat([4, 6], times(always(4), 18));
    expect(score(rolls)).toEqual(4 + 6 + 4 + 18 * 4)
  });

  it('1 strike bonus must be added', () => {
    const rolls = concat([10], times(always(4), 18));
    expect(score(rolls)).toEqual(10 + 4 + 4 + 18 * 4)
  });

  it('perfect games score is 300', () => {
    const rolls = times(always(10), 12);
    expect(score(rolls)).toEqual(300)
  });

});