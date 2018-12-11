import {pinNumbers} from '../src/pin_numbers';

describe("pin numbers", () => {
  it('should resolve pin numbers for 1 digit', () => {
    const actual = pinNumbers('8');
    expect(actual).toEqual(['5', '7', '8', '9', '0'])
  });

  it('should resolve pin numbers for another 1 digit', () => {
    const actual = pinNumbers('1');
    expect(actual).toEqual(['1', '2', '4'])
  });

  it('should resolve pin numbers for 2 digit', () => {
    const actual = pinNumbers('11');
    expect(actual.sort()).toEqual(["11", "22", "44", "12", "21", "14", "41", "24", "42"].sort())
  });

  it('should resolve pin numbers for 3 digit', () => {
    const actual = pinNumbers('369');
    expect(actual.sort())
      .toEqual(["339", "366", "399", "658", "636", "258", "268", "669", "668", "266", "369", "398", "256", "296", "259", "368", "638", "396", "238", "356", "659", "639", "666", "359", "336", "299", "338", "696", "269", "358", "656", "698", "699", "298", "236", "239"].sort())
  });

});