'use strict';
/* global TicTacToeGameBoard, TicTacToeRowTracker, TicTacToePlayer, RowQuery, TicTacToeEngine */

describe('The tic tac toe engine', function() {

  var engine, gameBoard, rowTracker, computerPlayer;

  var initializeTicTacToe = function(gameboard) {
    gameBoard.initializeGameboard(gameboard);
    for (var i=0;i<gameboard.length;i++) {
      if (gameboard[i]===TicTacToeGameBoard.X || gameboard[i]===TicTacToeGameBoard.O) {
        rowTracker.handlePlay(gameboard[i], i);
      }
    }
  };


  beforeEach(function() {
    gameBoard = TicTacToeGameBoard();
    rowTracker = TicTacToeRowTracker(RowQuery());
    computerPlayer = TicTacToePlayer(gameBoard, rowTracker);
    engine = TicTacToeEngine(gameBoard, rowTracker, computerPlayer);
  });

  it('should create a new game after one ends', function() {
    initializeTicTacToe([TicTacToeGameBoard.O, TicTacToeGameBoard.O,'','','','','','','']);
    engine.makeAMove(2, TicTacToeGameBoard.O);//resulting in game over(see next test)
    engine.newGame(TicTacToeGameBoard.X);
    var gameboard = gameBoard.currentBoardState();
    for(var i=0;i<gameboard.length;i++) {
      expect(gameboard[i]).toBe('');
    }
    var gameStatus = rowTracker.currentGameState();
    expect(gameStatus.isOver).toBe(false);
    expect(typeof gameStatus.winner).toBe('undefined');
    
  });

  it('should provide information about games end', function() {
    initializeTicTacToe([TicTacToeGameBoard.O, TicTacToeGameBoard.O,'','','','','','','']);
    var result = engine.makeAMove(2, TicTacToeGameBoard.O);
    expect(result.gameboard[2]).toBe(TicTacToeGameBoard.O);
    expect(result.gameboard[1]).toBe(TicTacToeGameBoard.O);
    expect(result.gameboard[0]).toBe(TicTacToeGameBoard.O);
    expect(result.gameboard[3]).toBe('');
    expect(result.gameboard[4]).toBe('');
    expect(result.gameboard[5]).toBe('');
    expect(result.gameboard[6]).toBe('');
    expect(result.gameboard[7]).toBe('');
    expect(result.gameboard[8]).toBe('');
    expect(result.gamestatus.isOver).toBe(true);
    expect(result.gamestatus.winner).toBe(TicTacToeGameBoard.O);

  });

  it('should provide information about game board and game status during play', function() {
    engine.newGame(TicTacToeGameBoard.X);
    var result = engine.makeAMove(2, TicTacToeGameBoard.X);
    expect(result.gamestatus.isOver).toBe(false);
    expect(result.gameboard[2]).toBe(TicTacToeGameBoard.X);
  });

  it('should counter any first move not in the center with a move to take the center', function() {
    engine.newGame(TicTacToeGameBoard.X);
    var result = engine.makeAMove(2, TicTacToeGameBoard.X);
    expect(result.gameboard[4]).toBe(TicTacToeGameBoard.O);
  });
  
});
