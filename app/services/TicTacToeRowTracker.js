'use strict';
/* global TicTacToeGameBoard */

function TicTacToeRowTracker(rowQuery) {
  //private variables
  var winner;

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
  var initializeKnowledge = function() {

    winner = null;
    var potentialWinners = {};
    potentialWinners[TicTacToeGameBoard.X] = [];
    potentialWinners[TicTacToeGameBoard.O] = [];
    return potentialWinners;

  };

  var potentialWinners = initializeKnowledge();


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
    removeAvailableCombinations(toRemove);
  };

  var removeAvailableCombinations = function(toRemove) {
    for (var j=0;j<toRemove.length;j++){
      availableCombos.splice(toRemove[j],1);
    }
  };

  var updateOwnedCombinations= function(player, index) {
    for(var i=0;i<potentialWinners[player].length;i++) {
      var foundIndex = potentialWinners[player][i].indexOf(index);
      if (foundIndex>-1) {
        potentialWinners[player][i][foundIndex] = player;
        if (rowQuery.hasAllMarks(player,potentialWinners[player][i])) {
          winner = player;
          return true;
        }
      }
    }
    return false;
  };

  var getOpponent = function(player) {
    return player===TicTacToeGameBoard.X?TicTacToeGameBoard.O:TicTacToeGameBoard.X;
  };




  return {
    //public methods

    reset:function() {
      initializeKnowledge();
    },

    handlePlay:function(player,index) {
      updateAvailableCombinations(player, index);
      return updateOwnedCombinations(player, index);
    },

    isOpponentAboutToWin:function(player) {
      var opposingPlayer = getOpponent(player);
      for(var i=0;i<potentialWinners[opposingPlayer].length;i++){
        if (rowQuery.hasTwoMarks(opposingPlayer,potentialWinners[opposingPlayer][i]) && 
            rowQuery.hasNoMarks(player,potentialWinners[opposingPlayer][i])){
          return true;
        }
      }
      return false;
    },


    spotToBlock:function(player) {
      var opposingPlayer = getOpponent(player);
      for(var i=0;i<potentialWinners[opposingPlayer].length;i++){
        if (rowQuery.hasTwoMarks(opposingPlayer,potentialWinners[opposingPlayer][i])){
          return rowQuery.firstAvailableSpot(opposingPlayer, potentialWinners[opposingPlayer][i]);
        }
        return -1;
      }
    },

    currentGameState: function() {
      if (winner) {
        return {
          isOver: true,
          winner: winner
        };
      } else {
        return {
          isOver: false
        };
      }
      
    }
  };
}


