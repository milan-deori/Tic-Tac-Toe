document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const quitBtn = document.getElementById("quit-btn");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const turnIndicator = document.getElementById("turnIndicator");
    const scoreX = document.getElementById("scoreX");
    const scoreO = document.getElementById("scoreO");
    const overlay = document.getElementById("overlay");
    const winOverlay = document.getElementById("winOverlay");
    const winMessage = document.getElementById("winMessage");

    let currentPlayer = "X";
    let gameActive = true;
    let score = { X: 0, O: 0 };

    // Winning patterns for Tic-Tac-Toe
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Function to start the game with the selected player
    const startGame = (chosenPlayer) => {
        currentPlayer = chosenPlayer;
        turnIndicator.innerHTML = `Turn: Player <span class="${currentPlayer === 'X' ? 'mark-x' : 'mark-o'}">${currentPlayer}</span>`;
        overlay.style.display = "none";
    };

    // Event listeners for choosing X or O
    document.getElementById("chooseX").addEventListener("click", () => startGame("X"));
    document.getElementById("chooseO").addEventListener("click", () => startGame("O"));

    // Function to reset the game board and turn indicator
    const resetGame = () => {
        gameActive = true;
        currentPlayer = "X";
        boxes.forEach(box => {
            box.textContent = "";
            box.style.color = ""; // Reset text color
            box.classList.remove("disabled", "mark-x", "mark-o"); // Remove previous classes
        });
        turnIndicator.innerHTML = `Turn: Player <span class="${currentPlayer === 'X' ? 'mark-x' : 'mark-o'}">${currentPlayer}</span>`;
        winOverlay.style.display = "none";
    };

    // Function to show a winning or draw message
    const showWinMessage = (message) => {
        winMessage.textContent = message;
        winOverlay.style.display = "flex";
    };

    // Function to check if there is a win or a draw
    const checkWin = () => {
        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
                gameActive = false;
                updateScore(currentPlayer);
                showWinMessage(`Player ${currentPlayer} Wins!`);
                return true;
            }
        }
        if (Array.from(boxes).every(box => box.textContent)) {
            showWinMessage("It's a Draw!");
            gameActive = false;
            return true;
        }
        return false;
    };

    // Function to update the score
    const updateScore = (winner) => {
        score[winner]++;
        scoreX.textContent = score.X;
        scoreO.textContent = score.O;
    };

    // Event listener for each box on the board
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (gameActive && box.textContent === "") {
                box.textContent = currentPlayer;
                box.style.color = currentPlayer === "X" ? "#ffcc00" : "#00bfff"; // Set text color for X and O
                box.classList.add("disabled", currentPlayer === "X" ? "mark-x" : "mark-o"); // Add the player's class

                if (!checkWin()) {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    turnIndicator.innerHTML = `Turn: Player <span class="${currentPlayer === 'X' ? 'mark-x' : 'mark-o'}">${currentPlayer}</span>`;
                }
            }
        });
    });

    // Event listener for the "Quit" button
    quitBtn.addEventListener("click", () => location.reload());

    // Event listener for the "Play Again" button on the win overlay
    playAgainBtn.addEventListener("click", resetGame);
});