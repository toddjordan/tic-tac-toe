'use strict';
TicTacToeGameBoard.CENTER = 4;
TicTacToeGameBoard.CORNERS = [0,2,6,8];
TicTacToeGameBoard.X = 'X';
TicTacToeGameBoard.O = 'O';

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

    firstAvailableSpot: function() {
      var taken;
      for(var i=0;i<gameboard.length;i++) {
        taken = this.isSpotTaken(i);
        if(!taken) {
          return i;
        }
      }
      return -1;
    },

    isCornerAvailable:function() {
      var taken;
      for (var i=0;i<TicTacToeGameBoard.CORNERS.length;i++){
        taken = this.isSpotTaken(TicTacToeGameBoard.CORNERS[i]);
        if(!taken) {
          return true;
        }
      }
      return false;
    },

    firstAvailableCorner:function() {
      var index = -1;
      for(var i=0;i<TicTacToeGameBoard.CORNERS.length;i++) {
        if(!this.isSpotTaken(TicTacToeGameBoard.CORNERS[i])) {
          return TicTacToeGameBoard.CORNERS[i];
        }
      }
      return index;
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

    isGameboardFull:function() {
      for (var i=0;i<gameboard.length;i++){
        if (gameboard[i].length===0) {
          return false;
        }
      }
      return true;
    },
    

    currentBoardState:function() {
      return gameboard.slice();
    }
  };
}


