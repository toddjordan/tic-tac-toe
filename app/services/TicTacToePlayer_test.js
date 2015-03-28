'use strict';
/* global TicTacToe, TicTacToePlayer, WinningCombinations,RowQuery */

describe('Tic tac toe player',function() {
  var player, game, knowledge;


  beforeEach(function() {
    game = TicTacToe();
    knowledge = WinningCombinations(RowQuery());
    player = TicTacToePlayer(game,knowledge,TicTacToe.X);
    
  });

  it('should block a win', function() {
    game.initializeGameboard([TicTacToe.O, TicTacToe.O,'','','','','','','']);
    knowledge.handlePlay(TicTacToe.O, 0);
    knowledge.handlePlay(TicTacToe.O, 1);
    player.takeTurn();
    expect(game.valueAt(2)).toBe(TicTacToe.X);
  });

  it('should go for top left corner if center is taken', function() {
    game.initializeGameboard(['','','','',TicTacToe.O,'','','','']);
    knowledge.handlePlay(TicTacToe.O,4);
    player.takeTurn();
    expect(game.valueAt(0)).toBe(TicTacToe.X);
  });

  it('should go for top right if center and bottom left are taken', function() {
    game.initializeGameboard([TicTacToe.X,'','','',TicTacToe.O,'','','',TicTacToe.O]);
    knowledge.handlePlay(TicTacToe.O,4);
    knowledge.handlePlay(TicTacToe.O,8);
    knowledge.handlePlay(TicTacToe.X,0);
    player.takeTurn();
    expect(game.valueAt(2)).toBe(TicTacToe.X);
  });

  it('should go for bottom left if center and top left and right are taken', function() {
    game.initializeGameboard([TicTacToe.X,'',TicTacToe.X,'',TicTacToe.O,TicTacToe.O,'','',TicTacToe.O]);
    knowledge.handlePlay(TicTacToe.O,4);
    knowledge.handlePlay(TicTacToe.O,5);
    knowledge.handlePlay(TicTacToe.O,8);
    knowledge.handlePlay(TicTacToe.X,0);
    knowledge.handlePlay(TicTacToe.X,2);
    player.takeTurn();
    expect(game.valueAt(3)).toBe(TicTacToe.X);
  });

  it('should take center spot if available', function() {
    player.takeTurn();
    expect(game.valueAt(TicTacToe.CENTER)).toBe(TicTacToe.X);
  });
});
