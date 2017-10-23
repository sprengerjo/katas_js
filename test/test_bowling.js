'use strict';

const should = require('should');
const R = require('ramda');

const Bowling = require('../src/bowling');

describe('bowling calculator', function () {

    let g;
    const rolls = (n) => () => g.roll(n)

    beforeEach(() => {
        g = new Bowling();
    });

    it('should return 0 for gutter games', () => {
        R.times(rolls(0), 20);

        should(g.score()).be.eql(0);
    });

    it('should sum one pin games', () => {
        R.times(rolls(1), 20);

        should(g.score()).be.eql(20);
    });

    it('should add spare bonus', () => {
        g.roll(4);
        g.roll(6);
        R.times(rolls(4), 18);

        should(g.score()).be.eql(4 + 6 + 4 + 18 * 4);
    });

    it('should add strike bonus', () => {
        g.roll(10);
        R.times(rolls(4), 18);

        should(g.score()).be.eql(10 + 4 + 4 + 18 * 4);
    });

    
    it('should score 300 for a perfect game', () => {
        R.times(rolls(10), 12)
        
        should(g.score()).be.eql(300);
    });
    

});
