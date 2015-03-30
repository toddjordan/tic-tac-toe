'use strict';


/**
 *  Brute force defense of fork setups.
 */
function TicTacToeForkDefense(gameBoard) {
  
  var forkCombos = {};
  forkCombos['07'] = 6;
  forkCombos['38'] = 6;
  forkCombos['27'] = 8;
  forkCombos['56'] = 8;
  forkCombos['15'] = 2;
  forkCombos['18'] = 2;
  forkCombos['23'] = 0;
  forkCombos['16'] = 0;

  return {
    
    indexToDefend:function(player) {
      for(var prop in forkCombos) {
        if(forkCombos.hasOwnProperty(prop)) {
          if (gameBoard.valueAt(prop.charAt(0))===player && 
              gameBoard.valueAt(prop.charAt(1))===player && 
              !gameBoard.isSpotTaken(forkCombos[prop])) {
            return forkCombos[prop];
          }
        }
      }
      return -1;
    },

  };
      
}
