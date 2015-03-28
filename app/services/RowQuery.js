'use strict';

function RowQuery() {

  return {
    hasAllMarks : function(player, combo) {
      return combo[0]===player && combo[1]===player && combo[2]===player;
    },
    hasTwoMarks : function(player, combo) {
      return combo.indexOf(player)!==combo.lastIndexOf(player);
    },
    hasNoMarks : function(player, combo) {
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
