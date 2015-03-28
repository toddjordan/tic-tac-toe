'use strict';
/* global WinningCombinations,RowQuery */

describe('winning combinations', function() {
var winningCombos;

beforeEach(function() {
  console.log('before each!');
  winningCombos = WinningCombinations(RowQuery());
});

it('should identify a winning combination', function() {
  winningCombos.handlePlay('x',0);
  winningCombos.handlePlay('x',1);
  var result = winningCombos.handlePlay('x',2);
  expect(result).toBe(true);
});

it('should identify when theres not a winning combination', function() {
  winningCombos.handlePlay('x', 0);
  var result = winningCombos.handlePlay('x', 1);
  expect(result).toBe(false);
});

});
