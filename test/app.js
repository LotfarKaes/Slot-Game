'use strict';

const assert = require('assert');
const request = require('supertest');

describe('getWin', function () {
  const getWin = require('../app').getWin;

  it('should return No Win for 3 different values', function () {
    const win = getWin([0, 1, 2]);
    assert.equal(win, 'No Win');
  });

  it('should return Small Win for 2 equal values', function () {
    const win = getWin([0, 1, 0]);
    assert.equal(win, 'Small Win');
  });


  it('should return Big Win for 3 equal values', function () {
    const win = getWin([0, 0, 0]);
    assert.equal(win, 'Big Win');
  });

});

describe('app', function () {
  const app = require('../app').app;

  it('should accept request and return an outcome', function (done) {
    request(app)
      .get('/outcome')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) throw err;

        assert(typeof res.body.outcome[0] === 'number');
        assert(typeof res.body.outcome[1] === 'number');
        assert(typeof res.body.outcome[2] === 'number');

        assert(typeof res.body.win === 'string');
        assert(typeof res.body.bonus === 'boolean');

        done();
      })
  });
});