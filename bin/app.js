const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const R = require('ramda');
const Set = require('immutable').Set;

const GameOfLife = require('../dist/src/gol');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', express.static('public'));

app.get('/gol', function(req, res) {
  res.sendFile(path.join(__dirname + '/gol/index.html'));
});

app.post('/gol', function(req, res) {
  const next = GameOfLife.default.nextGeneration;
  const decoratedFindNeighbours = R.memoizeWith(R.identity, cells => next(cells));

  res.send(decoratedFindNeighbours(req.body));
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});