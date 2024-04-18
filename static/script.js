const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell click
function handleCellClick(index) {
    if (!gameActive || boardState[index] !== '') return; // Ignore click if game is not active or cell is already filled

    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (isBoardFull()) {
        gameStatus.textContent = "It's a tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Function to check if a player has won
function checkWin(player) {
    return winningCombos.some(combo => {
        return combo.every(index => boardState[index] === player);
    });
}

// Function to check if the board is full
function isBoardFull() {
    return boardState.every(cell => cell !== '');
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});
