'use strict';
/* global TicTacToeGameBoard */

describe('Tic tac toe game',function() {
  var game;

  beforeEach(function() {
    game = TicTacToeGameBoard();
  });

  it('should set an item to the board', function() {
    game.initializeGameboard(new Array(9));
    var result = game.play(0,TicTacToeGameBoard.X);
    expect(game.valueAt(0)).toBe(TicTacToeGameBoard.X);
    expect(result).toBe(true);
  });

  it('should not set an item on the board if already taken', function() {
    game.initializeGameboard([TicTacToeGameBoard.O,'','','','','','','','']);
    var result = game.play(0,TicTacToeGameBoard.X);
    expect(game.valueAt(0)).toBe(TicTacToeGameBoard.O);
    expect(result).toBe(false);
  });

});
