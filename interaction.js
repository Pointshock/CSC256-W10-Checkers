// Created by Chris Tomaskovic
// JavaScript for the main page and form interaction

// Where the pieces are stored and start out by default
board = [
    [null, 'w', null, 'w', null, 'w', null, 'w'],
    ['w', null, 'w', null, 'w', null, 'w', null],
    [null, 'w', null, 'w', null, 'w', null, 'w'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['b', null, 'b', null, 'b', null, 'b', null],
    [null, 'b', null, 'b', null, 'b', null, 'b'],
    ['b', null, 'b', null, 'b', null, 'b', null]
]

function createBoard() {
    // Create the board div
    var theBoard = document.createElement('section');
    // Set the id of the board to checkers-board
    theBoard.id = 'checkers-board';
    document.body.appendChild(theBoard);


    // For loop that creates the chessboard
    // Loops through the rows and columns and creates a div for each square on the board 
    // and adds the class 'chess-square' to each div changing the background color of each square every other square
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var square = document.createElement('div');
            // Set up the square class
            square.classList.add('square');

            // Set an attribute for the square
            square.setAttribute('id', 'div' + i + j);

            // Add the black class to the square if it is an odd square
            if ((i + j) % 2 == 1) {
                square.classList.add('black');
                // Add an event listener to the square
                square.addEventListener('click', movePiece);
            }
            theBoard.appendChild(square);

            // Create the pieces
            if (board[i][j]) {
                createPiece("piece" + i + j, "checker-" + board[i][j], square);
            }
        }
    }
}

// Create a constant variable for the selected square
const selValueElem = document.querySelector("#selectedSquare")

// Function that creates the pieces
function createPiece(id, pieceClass, theSquare) {
    // Create the new piece div
    var newPiece = document.createElement('div');
    // Set up the piece class
    newPiece.setAttribute('id', id);
    // Add the checker style to the piece
    newPiece.classList.add("checker");
    // Add the piece class to the piece
    newPiece.classList.add(pieceClass);
    // Add an event listener to the piece
    newPiece.addEventListener('click', selectPiece);
    theSquare.appendChild(newPiece);
}

// Function that selects the piece
function selectPiece() {
    // Log the piece selected for debugging
    console.log("piece selected = ", event.target.id)

    // Get the id of the piece selected
    var selectedPieceId = event.target.id;
    // Remove the piece from the id
    selectedPieceId = selectedPieceId.replace("piece", "");

    // Set the data value of the selected square to the piece selected
    selValueElem.dataset.value = selectedPieceId;
}

// Function that moves the piece
function movePiece() {
    // Log the square selected for debugging
    console.log("square selected = ", event.target.id)

    // Get the id of the square selected
    var newSquareId = event.target.id;
    // Remove the div from the id
    newSquareId = newSquareId.replace("div", "");
    // Remove the piece from the id
    newSquareId = newSquareId.replace("piece", "");

    // Get the id of the piece selected
    var selectedPieceId = selValueElem.dataset.value;

    // Check if the piece selected is the same as the square selected
    if (selectedPieceId != newSquareId) {
        var oldSquare = document.getElementById("div" + selectedPieceId);
        var oldPiece = document.getElementById("piece" + selectedPieceId);
        // Check if ivory or black piece
        var pieceClass = oldPiece.classList[1];

        // Remove the piece from the old square
        oldSquare.removeChild(oldPiece);

        // Create the new piece on the new square
        var newSquare = document.getElementById("div" + newSquareId);

        // Create the new piece
        createPiece("piece" + newSquareId, pieceClass, newSquare);
    }
}