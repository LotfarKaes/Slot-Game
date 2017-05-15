'use strict';

const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/outcome', (req, res) => {
  let outcome = [
    getRandomInt(0, 6),
    getRandomInt(0, 6),
    getRandomInt(0, 6),
  ];

  let bonus = Math.random() > 0.7;

  let win = getWin(outcome);

  res.json({ outcome, win, bonus });
});

if (require.main == module) {
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

function getWin(outcome) {
  let win = 'No Win';

  let o = outcome;

  if (o[0] === o[1] || o[0] == o[2] || o[1] == o[2]) {
    win = 'Small Win';
  }

  if (o[0] === o[1] && o[0] === o[2]) {
    win = 'Big Win';
  }

  return win;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.app = app;
exports.getWin = getWin;