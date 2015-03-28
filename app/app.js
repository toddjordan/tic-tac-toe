'use strict';
/* global TicTacToe  */

angular.module('tictactoe', [
  'tictactoe.game'

]).
factory('TicTacToe', function() {
  return TicTacToe();
});
