'use strict';
/* global TicTacToeGameBoard */

function TicTacToeEngine(gameBoard, rowTracker, computerPlayer) {
  
  var counterMove = function(playerMarker) {
    var counterIndex = computerPlayer.takeTurn();
    var won = rowTracker.handlePlay(determineComputerMarker(playerMarker), counterIndex);
  };

  var determineComputerMarker = function(playerMarker) {
    return playerMarker===TicTacToeGameBoard.X?TicTacToeGameBoard.O:TicTacToeGameBoard.X;
  };

  return {

    newGame:function(playerType) {
      gameBoard.initializeGameboard(['','','','','','','','','']);
      rowTracker.reset();
      computerPlayer.initializePlayer(determineComputerMarker(playerType));
      return gameBoard.currentBoardState();
    },

    makeAMove:function(index, playerMarker) {
      gameBoard.play(index, playerMarker);
      var playerWon = rowTracker.handlePlay(playerMarker, index);
      if (!playerWon && !gameBoard.isGameboardFull()) {
        counterMove(playerMarker);
      } 
      var gamestatus = rowTracker.currentGameState();
      if (!gamestatus.isOver && gameBoard.isGameboardFull()) {
        gamestatus.isOver = true;
        gamestatus.winner = 'Tie';
      }
      return {
        gameboard:  gameBoard.currentBoardState(),
        gamestatus: gamestatus
      };
    },
        
  };
}
