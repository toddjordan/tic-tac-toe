'use strict';
TicTacToeGameBoard.CENTER = 4;
TicTacToeGameBoard.CORNERS = [0,2,6,8];
TicTacToeGameBoard.X = 'x';
TicTacToeGameBoard.O = 'o';

function TicTacToeGameBoard() {

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
      return gameboard[index] === TicTacToeGameBoard.X || gameboard[index] === TicTacToeGameBoard.O;
    },

    valueAt: function(index) {
      return gameboard[index];
    },

    initializeGameboard: function(board) {
      gameboard = board;
    },

    printGameboard:function() {
      return gameboard.toString();
    },

    currentBoardState:function() {
      return gameboard.slice();
    }
  };
}


