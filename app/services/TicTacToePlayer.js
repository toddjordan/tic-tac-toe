'use strict';
/*global TicTacToeGameBoard*/

function TicTacToePlayer(game, rowTracker) {
  
  var playerType = TicTacToeGameBoard.X;
  
  var playCorner = function() {
    var index = -1;
    for (var i=0;i<TicTacToeGameBoard.CORNERS.length;i++){
      if(!game.isSpotTaken(TicTacToeGameBoard.CORNERS[i])) {
        index = TicTacToeGameBoard.CORNERS[i];
        game.play(index, playerType);
        break;
      }
    }
    return index;
  };

  return {
    initializePlayer:function(playerMarker) {
      playerType = playerMarker;
    },
    takeTurn:function() {
      var index;
      if(rowTracker.isOpponentAboutToWin(playerType)) {
        console.log('opponent is about to win, blocking...');
        index = rowTracker.spotToBlock(playerType);
        game.play(index, playerType);
      } else if(!game.isSpotTaken(TicTacToeGameBoard.CENTER)){
        index = TicTacToeGameBoard.CENTER;
        game.play(index,playerType);
      } else {
        index = playCorner();
      }
      console.log('gameboard: ' + game.printGameboard());
      return index;
    }
  };
}
