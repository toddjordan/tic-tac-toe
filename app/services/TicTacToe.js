'use strict';
TicTacToe.CENTER = 4;
TicTacToe.CORNERS = [0,2,6,8];
TicTacToe.X = 'x';
TicTacToe.O = 'o';

function TicTacToe() {

  var gameboard = [];

  return {

    play: function(index, marker) {
      console.log('play: ' + index + ":" + marker);
      if (!this.isSpotTaken(index)) {
        gameboard[index]=marker;
        return true;
      }
      return false;
    },

    isSpotTaken: function(index) {
      return gameboard[index] === TicTacToe.X || gameboard[index] === TicTacToe.O;
    },

    valueAt: function(index) {
      return gameboard[index];
    },

    initializeGameboard: function(board) {
      gameboard = board;
    },

    printGameboard:function() {
      return gameboard.toString();
    }
  };
}


