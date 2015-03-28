'use strict';

function RowQuery() {

  return {
    allMarks : function(player, combo) {
      return combo[0]===player && combo[1]===player && combo[2]===player;
    },
    twoMarks : function(player, combo) {
      return combo.indexOf(player)!==combo.lastIndexOf(player);
    },
    noMarks : function(player, combo) {
      return combo.indexOf(player)===-1;
    },
    firstAvailableSpot : function(player, combo) {
      for (var i=0;i<combo.length;i++){
        if (combo[i]!==player){
          return combo[i];
        }
      }
      return -1;
    }

  };
}
