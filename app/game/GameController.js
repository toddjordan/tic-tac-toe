'use strict';
/*global TicTacToeGameBoard*/

var gameModule = angular.module('tictactoe.game', []);

gameModule.controller('TicTacToeGameController', ['$scope','$modal', 'GameEngine', function($scope, $modal, gameEngine) {

  var getPlayer = function() {
    return $scope.playerx?TicTacToeGameBoard.X:TicTacToeGameBoard.O;
  };


  $scope.playerx = true;
  $scope.gameboard = gameEngine.newGame(getPlayer());
  
  $scope.startGame = function() {
    $scope.gameboard = gameEngine.newGame(getPlayer());
  };

  $scope.selectPlayer = function(isX) {
    console.log('select player is X: '+isX);
    $scope.playerx = isX;
    $scope.gameboard = gameEngine.newGame(getPlayer());
  };

  $scope.makeAMove = function(cellIndex) {
    if ($scope.gameboard[cellIndex].length>0) {return;}
    var result = gameEngine.makeAMove(cellIndex, getPlayer());
    $scope.gameboard = result.gameboard;
    if (result.gamestatus.isOver) {
      console.log('Game Over: Winner: ' + result.gamestatus.winner);
      $scope.winner = result.gamestatus.winner;
      var modalInstance = $modal.open({
        templateUrl:'gameOver.html',
        controller:'GameOverController',
        size:'sm',
        resolve: {
          winner:function() {
            return $scope.winner;
          }
        }
      });
      modalInstance.result.then(function() {
        $scope.startGame();
      });
    }
  };

}]);

gameModule.controller('GameOverController', ['$scope', '$modalInstance', 'winner', function($scope, $modalInstance, winner){
  $scope.winner = winner;
  $scope.startGame = function() {
    $modalInstance.close();
  };
}]);

