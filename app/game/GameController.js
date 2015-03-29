'use strict';
/*global TicTacToeGameBoard*/

var gameModule = angular.module('tictactoe.game', []);

gameModule.controller('TicTacToeGameController', ['$scope', 'GameEngine', function($scope, gameEngine) {

  $scope.playerMarker = TicTacToeGameBoard.X;
  $scope.gameboard = gameEngine.newGame($scope.playerMarker);
  $scope.gameState = 1;
  
  $scope.startGame = function() {
    $scope.gameboard = gameEngine.newGame($scope.playerMarker);
    $scope.gameState = 1;
  };

  $scope.makeAMove = function(cellIndex) {
    var result = gameEngine.makeAMove(cellIndex, $scope.playerMarker);
    $scope.gameboard = result.gameboard;
    if (result.gamestatus.isOver) {
      $scope.gameState = 0;
      $scope.winner = result.gamestatus.winner;
    }

  };

}]);

