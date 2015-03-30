'use strict';
/*global TicTacToeGameBoard*/

function TicTacToePlayer(game, rowTracker, forkDefense) {
  
  var playerType = TicTacToeGameBoard.X;
  
  var getOpponent = function(player) {
    return player===TicTacToeGameBoard.X?TicTacToeGameBoard.O:TicTacToeGameBoard.X;
  };

  
  return {
    initializePlayer:function(playerMarker) {
      playerType = playerMarker;
    },
    takeTurn:function() {
      var index;
      if(rowTracker.amIAboutToWin(playerType)){
        console.log('ftw!');
        index = rowTracker.spotToWin(playerType);
        game.play(index, playerType);
      } else if(rowTracker.isOpponentAboutToWin(playerType)) {
        console.log('opponent is about to win, blocking...');
        index = rowTracker.spotToBlock(playerType);
        game.play(index, playerType);
      } else if (forkDefense.indexToDefend(getOpponent(playerType))>-1) {
        console.log('fork defense!');
        index = forkDefense.indexToDefend(getOpponent(playerType));
        game.play(index, playerType);
      } else if(!game.isSpotTaken(TicTacToeGameBoard.CENTER)){
        console.log('picking center');
        index = TicTacToeGameBoard.CENTER;
        game.play(index,playerType);
      } else if (game.isCornerAvailable()){
        console.log('playing corner');
        index = game.firstAvailableCorner();
        game.play(index, playerType);
      } else {
        console.log('playing anything');
        index = game.firstAvailableSpot();
        game.play(index,playerType);
      }
      console.log('gameboard: ' + game.printGameboard());
      console.log('returning index '+index);
      return index;
    }
  };
}
