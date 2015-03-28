'use strict';
/*global TicTacToe*/

function TicTacToePlayer(game, knowledge, playerType) {
  var playCorner = function() {
    for (var i=0;i<TicTacToe.CORNERS.length;i++){
      if(!game.isSpotTaken(TicTacToe.CORNERS[i])) {
        game.play(TicTacToe.CORNERS[i], playerType);
        break;
      }
    }
  };

  return {
    takeTurn:function() {
      console.log('taking turn');
      if(knowledge.isOpponentAboutToWin(playerType)) {
        console.log('opponent is about to win');
        game.play(knowledge.spotToBlock(playerType), playerType);
      } else if(!game.isSpotTaken(TicTacToe.CENTER)){
        game.play(TicTacToe.CENTER,playerType);
      } else {
        playCorner();
      }
      console.log('gameboard: ' + game.printGameboard());
    }
  };
}
