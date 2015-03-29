'use strict';
/* global TicTacToeGameBoard, TicTacToePlayer, TicTacToeRowTracker, RowQuery */

describe('Tic tac toe player',function() {
  var player, game, knowledge;
  
  var initializeTicTacToe = function(gameboard) {
    game.initializeGameboard(gameboard);
    for (var i=0;i<gameboard.length;i++) {
      if (gameboard[i]===TicTacToeGameBoard.X || gameboard[i]===TicTacToeGameBoard.O) {
        knowledge.handlePlay(gameboard[i], i);
      }
    }
  };

  beforeEach(function() {
    game = TicTacToeGameBoard();
    knowledge = TicTacToeRowTracker(RowQuery());
    player = TicTacToePlayer(game,knowledge);
    player.initializePlayer(TicTacToeGameBoard.X);
  });

  it('should block a win', function() {
    initializeTicTacToe([TicTacToeGameBoard.O, TicTacToeGameBoard.O,'','','','','','','']);
    player.takeTurn();
    expect(game.valueAt(2)).toBe(TicTacToeGameBoard.X);
  });

  it('should go for top left corner if center is taken', function() {
    initializeTicTacToe(['','','','',TicTacToeGameBoard.O,'','','','']);
    player.takeTurn();
    expect(game.valueAt(0)).toBe(TicTacToeGameBoard.X);
  });

  it('should go for top right if center and bottom left are taken', function() {
    initializeTicTacToe([TicTacToeGameBoard.X,'','','',TicTacToeGameBoard.O,'','','',TicTacToeGameBoard.O]);
    player.takeTurn();
    expect(game.valueAt(2)).toBe(TicTacToeGameBoard.X);
  });

  it('should go for bottom left if center and top left and right are taken', function() {
    initializeTicTacToe([TicTacToeGameBoard.X,'',TicTacToeGameBoard.X,'',TicTacToeGameBoard.O,TicTacToeGameBoard.O,'','',TicTacToeGameBoard.O]);
    player.takeTurn();
    expect(game.valueAt(3)).toBe(TicTacToeGameBoard.X);
  });

  it('should take center spot if available', function() {
    player.takeTurn();
    expect(game.valueAt(TicTacToeGameBoard.CENTER)).toBe(TicTacToeGameBoard.X);
  });
});
