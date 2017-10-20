/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  //make new board
  var boardLength = n;
  var board = new Board({n: boardLength});
  var colOccupied = {};

  //inner recursive function
  var pieceAdder = function(rooks) {
    //if the number of rooks is equal to the size of the board
    if (rooks === boardLength) {
      //check if there are no conflicts
      if (!board.hasAnyRooksConflicts()) {
        //if no conflicts, solution = board
        solution = board.rows();
      }
      return;
    }
    //loop over "children" of the current board, and call our inner recursive function on each "child"
    var y = rooks;
    for (var x = 0; x < boardLength; x++) {
      if (!colOccupied[x]) {
        board.togglePiece(y, x);
        colOccupied[x] = 1;
        pieceAdder(rooks + 1);
        if (solution) {
          return;
        }
        //clear the point that this function added
        board.togglePiece(y, x);
        colOccupied[x] = 0;
      }
    }
  };
  pieceAdder(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //make new board
  var boardLength = n;
  var board = new Board({n: boardLength});
  var colOccupied = {};

  //inner recursive function
  var pieceAdder = function(rooks) {
    //if the number of rooks is equal to the size of the board
    if (rooks === boardLength) {
      //check if there are no conflicts
      if (!board.hasAnyRooksConflicts()) {
        //if no conflicts, solution = board
        solutionCount++;
      }
      return;
    }
    //loop over "children" of the current board, and call our inner recursive function on each "child"
    var y = rooks;
    for (var x = 0; x < boardLength; x++) {
      if (!colOccupied[x]) {
        board.togglePiece(y, x);
        colOccupied[x] = 1;
        pieceAdder(rooks + 1);
        //clear the point that this function added
        board.togglePiece(y, x);
        colOccupied[x] = 0;
      }
    }
  };
  pieceAdder(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var solutionCount = 0;
  //make new board
  var boardLength = n;
  var board = new Board({n: boardLength});
  var colOccupied = {};

  //inner recursive function
  var pieceAdder = function(rooks) {
    //if the number of rooks is equal to the size of the board
    if (rooks === boardLength) {
      //check if there are no conflicts
      if (!board.hasAnyQueensConflicts()) {
        //if no conflicts, solution = board
        solution = board.rows();
      }
      return;
    }
    //loop over "children" of the current board, and call our inner recursive function on each "child"
    var y = rooks;
    for (var x = 0; x < boardLength; x++) {
      if (!colOccupied[x]) {
        board.togglePiece(y, x);
        colOccupied[x] = 1;
        pieceAdder(rooks + 1);
        if (solution) {
          return;
        }
        //clear the point that this function added
        board.togglePiece(y, x);
        colOccupied[x] = 0;
      }
    }
  };
  pieceAdder(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (solution === undefined) {
    solution = new Board({n: boardLength}).rows();
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined;
  var solutionCount = 0;
  //make new board
  var boardLength = n;
  var board = new Board({n: boardLength});
  var colOccupied = {};

  //inner recursive function
  var pieceAdder = function(rooks, diagLeft, diagRight) {
    //if the number of rooks is equal to the size of the board
    if (rooks === boardLength) {
      //check if there are no conflicts
      if (!board.hasAnyQueensConflicts()) {
        //if no conflicts, solution = board
        solutionCount++;
      }
      return;
    }
    //loop over "children" of the current board, and call our inner recursive function on each "child"
    var y = rooks;
    for (var x = 0; x < boardLength; x++) {
      if ((!colOccupied[x]) && (x !== diagLeft) && (x !== diagRight)) {
        board.togglePiece(y, x);
        colOccupied[x] = 1;
        pieceAdder(rooks + 1, x - 1, x + 1);
        //clear the point that this function added
        board.togglePiece(y, x);
        colOccupied[x] = 0;
      }
    }
  };
  pieceAdder(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
