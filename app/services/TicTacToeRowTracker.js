'use strict';
/* global TicTacToeGameBoard */

function TicTacToeRowTracker(rowQuery) {
  //private variables
  var winner;
  var availableCombos; 
  var potentialWinners;

  //private methods
  var initializeKnowledge = function() {
    availableCombos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [6,4,2]
    ]; 
    winner = null;
    potentialWinners = {};
    potentialWinners[TicTacToeGameBoard.X] = [];
    potentialWinners[TicTacToeGameBoard.O] = [];
  };
  
  initializeKnowledge();

  var updateAvailableCombinations= function(player,index) {
    var toRemove = [];
    for(var i=0;i<availableCombos.length;i++) {
      var foundIndex = availableCombos[i].indexOf(index);
      if(foundIndex>-1) {
        availableCombos[i][foundIndex] = player;
        potentialWinners[player].push(availableCombos[i]);
        toRemove.push(availableCombos[i]);
      }
    }
    removeFromArray(toRemove, availableCombos);
  };

  var removeFromArray = function(toRemove, arrayToRemoveFrom) {
    for (var j=0;j<toRemove.length;j++){
      var indexToRemove = arrayToRemoveFrom.indexOf(toRemove[j]);
      arrayToRemoveFrom.splice(indexToRemove,1);
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

  var updateOpponentOwnedCombinations=function(player, index) {
    var opposingPlayer = getOpponent(player);
    var toRemove = [];
    for(var i=0;i<potentialWinners[opposingPlayer].length;i++) {
      var foundIndex = potentialWinners[opposingPlayer][i].indexOf(index);
      if (foundIndex>-1) {
        toRemove.push(potentialWinners[opposingPlayer][i]);
      }
    }
    removeFromArray(toRemove, potentialWinners[opposingPlayer]);
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
      console.log('handle play: '+ index +':'+ player);
      updateAvailableCombinations(player, index);
      updateOpponentOwnedCombinations(player, index);
      return updateOwnedCombinations(player, index);
    },

    isOpponentAboutToWin:function(player) {
      return this.amIAboutToWin(getOpponent(player));
    },

    amIAboutToWin:function(player) {
      for(var i=0;i<potentialWinners[player].length;i++){
        if (rowQuery.hasTwoMarks(player,potentialWinners[player][i])){
          return true;
        }
      }
      return false;
    },


    spotToBlock:function(player) {
      var opposingPlayer = getOpponent(player);
      return this.spotToWin(opposingPlayer);
    },

    spotToWin:function(player) {
      for(var i=0;i<potentialWinners[player].length;i++){
        if (rowQuery.hasTwoMarks(player,potentialWinners[player][i])){
          return rowQuery.firstAvailableSpot(player, potentialWinners[player][i]);
        }
      }
      return -1;      
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


