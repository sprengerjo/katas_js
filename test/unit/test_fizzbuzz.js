'use strict';

const should = require('should');

const FizzBuzz = require('./../../app/js/fizzbuzz');

describe('fizz buzz', () => {

    it("should return empty array for empty cell", () => {
        should(FizzBuzz.upTo(16)).eql(["1", "2", "fizz", "4", "buzz", "fizz", "7", "8", "fizz",
            "buzz", "11", "fizz", "13", "14", "fizzbuzz", "16"]);
    });
  
});
