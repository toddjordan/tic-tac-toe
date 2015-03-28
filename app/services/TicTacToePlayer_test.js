'use strict';
/* global TicTacToe, TicTacToePlayer, WinningCombinations,RowQuery */

describe('Tic tac toe player',function() {
  var player, game, knowledge;
  
  var initializeTicTacToe = function(gameboard) {
    game.initializeGameboard(gameboard);
    for (var i=0;i<gameboard.length;i++) {
      if (gameboard[i]===TicTacToe.X || gameboard[i]===TicTacToe.O) {
        knowledge.handlePlay(gameboard[i], i);
      }
    }
  };

  beforeEach(function() {
    game = TicTacToe();
    knowledge = WinningCombinations(RowQuery());
    player = TicTacToePlayer(game,knowledge,TicTacToe.X);
    
  });

  it('should block a win', function() {
    initializeTicTacToe([TicTacToe.O, TicTacToe.O,'','','','','','','']);
    player.takeTurn();
    expect(game.valueAt(2)).toBe(TicTacToe.X);
  });

  it('should go for top left corner if center is taken', function() {
    initializeTicTacToe(['','','','',TicTacToe.O,'','','','']);
    player.takeTurn();
    expect(game.valueAt(0)).toBe(TicTacToe.X);
  });

  it('should go for top right if center and bottom left are taken', function() {
    initializeTicTacToe([TicTacToe.X,'','','',TicTacToe.O,'','','',TicTacToe.O]);
    player.takeTurn();
    expect(game.valueAt(2)).toBe(TicTacToe.X);
  });

  it('should go for bottom left if center and top left and right are taken', function() {
    initializeTicTacToe([TicTacToe.X,'',TicTacToe.X,'',TicTacToe.O,TicTacToe.O,'','',TicTacToe.O]);
    player.takeTurn();
    expect(game.valueAt(3)).toBe(TicTacToe.X);
  });

  it('should take center spot if available', function() {
    player.takeTurn();
    expect(game.valueAt(TicTacToe.CENTER)).toBe(TicTacToe.X);
  });
});
