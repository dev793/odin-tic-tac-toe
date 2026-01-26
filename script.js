const displayController = (function() {
    const gameboardContainer = document.querySelector("#gameboard-container");

    const renderGameboard = (board, onCellClick) => {
        gameboardContainer.innerHTML = "";

        board.forEach((item, index) => {
            const gameCell = document.createElement("div");
            gameCell.classList.add("game-cell");

            if (item) {
                gameCell.textContent = item;
            }

            gameCell.addEventListener("click", () => onCellClick(index));

            gameboardContainer.append(gameCell)
        });
    }

    return {renderGameboard};
})();

const gameboard = (function () {
    let boardArray = Array(9).fill(null);

    const updateCell = (cell, symbol) => {
        boardArray[cell] = symbol;
    }

    const allEqual = (index1, index2, index3) => {
        return (
            boardArray[index1] === boardArray[index2] 
            && boardArray[index2] === boardArray[index3]
            && boardArray[index1] !== null
        );
    }

    const checkWin = () => {
        return (
            allEqual(0, 1, 2)
            || allEqual(3, 4, 5)
            || allEqual(6, 7, 8)
            || allEqual(0, 3, 6)
            || allEqual(1, 4, 7)
            || allEqual(2, 5, 8)
            || allEqual(0, 4, 8)
            || allEqual(2, 4, 6)
        )
    }

    const isCellEmpty = (index) => {
        return boardArray[index] === null;
    }

    const isBoardFull = () => {
        return !boardArray.includes(null);
    }

    return { boardArray, updateCell, checkWin, isCellEmpty, isBoardFull };
})();

const gameController = (function() {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

    let playerTurn = player1;
    let isGameOver = false;

    const handleClick = (index) => {
        if (isGameOver) return;

        if (gameboard.isCellEmpty(index)) {
            gameboard.updateCell(index, playerTurn.symbol);
            displayController.renderGameboard(gameboard.boardArray, handleClick);

            isGameOver = gameboard.checkWin();

            if (isGameOver) {
                console.log(`Congratulations, ${playerTurn.name} won!`);
                return;
            };

            if (gameboard.isBoardFull()) {
                console.log("It's a tie!");
                isGameOver = true;
                return;
            }
        
            playerTurn = playerTurn === player1 ? player2 : player1;          
        } else {
            console.log("Please choose an empty cell");
        }
    }

    displayController.renderGameboard(gameboard.boardArray, handleClick);

    return { handleClick }; 
})();

function createPlayer(name, symbol) {
    return { name, symbol };
}