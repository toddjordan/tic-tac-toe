'use strict';
/* global TicTacToeRowTracker,RowQuery,TicTacToeGameBoard */

describe('Tic tac toe row tracker', function() {
var winningCombos;

beforeEach(function() {
  winningCombos = TicTacToeRowTracker(RowQuery());
});

it('should identify a winning combination', function() {
  winningCombos.handlePlay(TicTacToeGameBoard.X,0);
  winningCombos.handlePlay(TicTacToeGameBoard.X,1);
  var result = winningCombos.handlePlay(TicTacToeGameBoard.X,2);
  expect(result).toBe(true);
});

it('should identify when theres not a winning combination', function() {
  winningCombos.handlePlay(TicTacToeGameBoard.X, 0);
  var result = winningCombos.handlePlay(TicTacToeGameBoard.X, 1);
  expect(result).toBe(false);
});

});
