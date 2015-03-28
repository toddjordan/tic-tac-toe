'use strict';
/* global TicTacToe */

function WinningCombinations(rowQuery) {
  //private variables
  var potentialWinners = {};
  potentialWinners[TicTacToe.X] = [];
  potentialWinners[TicTacToe.O] = [];

  var availableCombos= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
  ]; 

  //private methods

  var updateAvailableCombinations= function(player,index) {
    var toRemove = [];
    for(var i=0;i<availableCombos.length;i++) {
      var foundIndex = availableCombos[i].indexOf(index);
      if(foundIndex>-1) {
        availableCombos[i][foundIndex] = player;
        potentialWinners[player].push(availableCombos[i]);
        toRemove.push(i);
      }
    }
    for (var j=0;j<toRemove.length;j++){
      availableCombos.splice(toRemove[j],1);
    }
  };

  var updateOwnedCombinations= function(player, index) {
    for(var i=0;i<potentialWinners[player].length;i++) {
      var foundIndex = potentialWinners[player][i].indexOf(index);
      if (foundIndex>-1) {
        potentialWinners[player][i][foundIndex] = player;
        if (rowQuery.allMarks(player,potentialWinners[player][i])) {
          return true;
        }
      }

    }
    return false;
  };

  var getOpponent = function(player) {
    return player===TicTacToe.X?TicTacToe.O:TicTacToe.X;
  };


  return {
    //public methods

    handlePlay:function(player,index) {
      updateAvailableCombinations(player, index);
      return updateOwnedCombinations(player, index);
    },


    isOpponentAboutToWin:function(player) {
      var opposingPlayer = getOpponent(player);
      for(var i=0;i<potentialWinners[opposingPlayer].length;i++){
        if (rowQuery.twoMarks(opposingPlayer,potentialWinners[opposingPlayer][i]) && 
            rowQuery.noMarks(player,potentialWinners[opposingPlayer][i])){
          console.log('about to win');
          return true;
        }
      }
      console.log('not about to win');
      return false;
    },


    spotToBlock:function(player) {
      var opposingPlayer = getOpponent(player);
      for(var i=0;i<potentialWinners[opposingPlayer].length;i++){
        if (rowQuery.twoMarks(opposingPlayer,potentialWinners[opposingPlayer][i])){
          return rowQuery.firstAvailableSpot(opposingPlayer, potentialWinners[opposingPlayer][i]);
        }
        return -1;
      }
    }
    
  };
}


