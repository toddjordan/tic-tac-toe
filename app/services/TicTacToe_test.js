'use strict';
/* global TicTacToe */

describe('Tic tac toe game',function() {
  var game;

  beforeEach(function() {
    game = TicTacToe();

    
  });

  it('should set an item to the board', function() {
    game.initializeGameboard(new Array(9));
    var result = game.play(0,TicTacToe.X);
    expect(game.valueAt(0)).toBe(TicTacToe.X);
    expect(result).toBe(true);
  });

  it('should not set an item on the board if already taken', function() {
    game.initializeGameboard([TicTacToe.O,'','','','','','','','']);
    var result = game.play(0,TicTacToe.X);
    expect(game.valueAt(0)).toBe(TicTacToe.O);
    expect(result).toBe(false);
  });

});
