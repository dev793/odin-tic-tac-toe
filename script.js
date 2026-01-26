const gameboard = (function () {
    let boardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const displayBoard = () => {
        console.log(`[${boardArray[0]}] [${boardArray[1]}] [${boardArray[2]}]\n[${boardArray[3]}] [${boardArray[4]}] [${boardArray[5]}]\n[${boardArray[6]}] [${boardArray[7]}] [${boardArray[8]}]`)
    }

    const updateCell = (cell, symbol) => {
        boardArray[cell-1] = symbol;
        displayBoard();
    }

    const allEqual = (index1, index2, index3) => {
        return (boardArray[index1] === boardArray[index2] && boardArray[index2] === boardArray[index3]);
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

    return { boardArray, updateCell, checkWin };
})();

const gameController = (function() {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

    let playerTurn = player1;
    let gameWon = false;

    const playRound = (player) => {
        gameboard.updateCell(player.getPlayerInput(), player.symbol);
    }

    const playGame = () => {
        while (!gameWon) {
            playRound(playerTurn)
            gameWon = gameboard.checkWin();

            if (gameWon) {
                console.log(`Congratulations, ${playerTurn.name} won!`)
            }
            playerTurn = playerTurn === player1 ? player2 : player1;
        }
    }

    return { playGame };
})();

function createPlayer(name, symbol) {
    const getPlayerInput = () => {
        const playerInput = Number(prompt("What square do you want to play"));
        return playerInput;
    }
    
    return { name, symbol, getPlayerInput };
}

// add logic to prevent cell overwrite somewhere