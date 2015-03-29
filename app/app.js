'use strict';
/* global TicTacToeGameBoard, TicTacToeRowTracker, RowQuery, TicTacToeEngine, TicTacToePlayer  */

angular.module('tictactoe', [
  'tictactoe.game'

]).
factory('GameEngine', function() {
  var gameBoard = TicTacToeGameBoard();
  var rowTracker = TicTacToeRowTracker(RowQuery());
  var computerPlayer = TicTacToePlayer(gameBoard, rowTracker);
  return TicTacToeEngine(gameBoard, rowTracker, computerPlayer);
});
