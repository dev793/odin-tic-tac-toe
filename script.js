const displayController = (function() {
    const gameboardContainer = document.querySelector("#gameboard-container");

    const renderGameboard = (arr) => {
        gameboardContainer.innerHTML = "";

        arr.forEach((item, index) => {
            const gameCell = document.createElement("div");
            gameCell.classList.add("game-cell");

            if (item) {
                gameCell.textContent = item;
            }

            gameCell.addEventListener("click", () => {
                gameController.handleClick(index);
            });

            gameboardContainer.append(gameCell)
        });
    }

    return {renderGameboard};
})();

const gameboard = (function () {
    let boardArray = Array(9).fill(null);

    const initalDisplay = () => {
        displayController.renderGameboard(boardArray);
    }

    const updateCell = (cell, symbol) => {
        boardArray[cell] = symbol;
        displayController.renderGameboard(boardArray);
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

    return { initalDisplay, updateCell, checkWin, isCellEmpty };
})();

const gameController = (function() {
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");

    let playerTurn = player1;
    let gameWon = false;

    gameboard.initalDisplay()

    const handleClick = (index) => {

        if (gameboard.isCellEmpty(index)) {
            gameboard.updateCell(index, playerTurn.symbol);
            gameWon = gameboard.checkWin();

            if (gameWon) {
                console.log(`Congratulations, ${playerTurn.name} won!`)
            };
        
            playerTurn = playerTurn === player1 ? player2 : player1;          
        } else {
            console.log("Please choose an empty cell");
        }
    }

    return { handleClick }; 
})();

function createPlayer(symbol) {
    const getPlayerInput = () => {
        const playerInput = Number(prompt("What square do you want to play"));
        return playerInput;
    }
    
    return { symbol, getPlayerInput };
}
