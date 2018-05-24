'use strict';
import * as should from 'should';
import * as R from 'ramda';
import {FizzBuzz} from '../src/fizzbuzz';
import {ProcessEngine} from '../src/process_engine/process_engine_boilerplate';

describe('fizz buzz', () => {

  const n = 1000;
  const functions: Array<Function> = [FizzBuzz.upToStringZip, FizzBuzz.upToLookUp,
    FizzBuzz.upToConditional, FizzBuzz.upToPipeline, FizzBuzz.upToStringZipImuutable];

  let processEngine;
  before(async() => {
    processEngine = new ProcessEngine();
    await processEngine.initialize();
  });

  const assertFizzBuzz = (n, expected) => R.pipe(
    R.map((fun: any) => R.call(fun, n)),
    R.forEach((actual) => should(actual).eql(expected)))
  (functions);

  it('should assert fizz buzz up to ...', () => {
    assertFizzBuzz(1, ['1']);
    assertFizzBuzz(3, ['1', '2', 'fizz']);
    assertFizzBuzz(5, ['1', '2', 'fizz', '4', 'buzz']);
    assertFizzBuzz(17, ['1', '2', 'fizz', '4', 'buzz', 'fizz', '7', '8', 'fizz', 'buzz', '11', 'fizz', '13', '14', 'fizzbuzz', '16', '17']);
  });

  it(`upToStringZipImmutable '${n}' iterations`, () => {
    const actual = FizzBuzz.upToStringZipImuutable(n);
    should(actual.length).eql(n);
    should(R.last(actual)).eql('buzz');
  });

  it(`upToStringZip '${n}' iterations`, () => {
    const actual = FizzBuzz.upToStringZip(n);
    should(actual.length).eql(n);
    should(R.last(actual)).eql('buzz');
  });

  it(`upToLookUp '${n}' iterations`, () => {
    const actual = FizzBuzz.upToLookUp(n);
    should(actual.length).eql(n);
    should(R.last(actual)).eql('buzz');
  });

  it(`upToConditional '${n}' iterations`, () => {
    const actual = FizzBuzz.upToConditional(n);
    should(actual.length).eql(n);
    should(R.last(actual)).eql('buzz');
  });

  it(`upToPipeline '${n}' iterations`, () => {
    const actual = FizzBuzz.upToPipeline(n);
    should(actual.length).eql(n);
    should(R.last(actual)).eql('buzz');
  });

  it(`upToWithProcessEngine '${n}' iterations`, async() => {
    const fizzbuzzUpTo = processEngine.execute('fizzy-upTo');

    const actual = await fizzbuzzUpTo({upTo: n + 1, i: 1});

    should(actual.length).eql(n);
    should(R.last(actual)).eql('buzz');
  });

  it(`upToWithProcessEngine '17' iterations`, async() => {
    const fizzbuzzUpTo = processEngine.execute('fizzy-upTo');

    const actual = await fizzbuzzUpTo({upTo: 18, i: 1});

    should(actual).eql(['1', '2', 'fizz', '4', 'buzz', 'fizz', '7', '8', 'fizz', 'buzz', '11', 'fizz', '13', '14', 'fizzbuzz', '16', '17']);
  });
});
