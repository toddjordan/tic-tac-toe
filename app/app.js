'use strict';
/* global TicTacToeGameBoard, TicTacToeRowTracker, RowQuery, TicTacToeEngine, TicTacToePlayer, TicTacToeForkDefense  */

angular.module('tictactoe', [
  'tictactoe.game',
  'ui.bootstrap'

]).
factory('GameEngine', function() {
  var gameBoard = TicTacToeGameBoard();
  var rowTracker = TicTacToeRowTracker(RowQuery());
  var computerPlayer = TicTacToePlayer(gameBoard, rowTracker, TicTacToeForkDefense(gameBoard));
  return TicTacToeEngine(gameBoard, rowTracker, computerPlayer);
});
