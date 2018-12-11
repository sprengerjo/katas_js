const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const R = require('ramda');

const GameOfLife = require('../dist/src/gol');

const gol_server = express();
gol_server.use(bodyParser.json({limit: '50mb'}));
gol_server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

gol_server.use('/', express.static('public'));

gol_server.get('/gol', function(req, res) {
  res.sendFile(path.join(__dirname + '/gol/index.html'));
});

gol_server.post('/gol', function(req, res) {
  const next = GameOfLife.default.nextGeneration;
  const decoratedFindNeighbours = R.memoizeWith(R.identity, cells => next(cells));

  res.send(decoratedFindNeighbours(req.body));
});

gol_server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});