const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const boardModel = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const isSquareEmpty = (index) => {
        if(boardModel.getBoard()[index] === '') {
            return true;
        }

        return false;
    };

    const isBoardFull = () => {
        if(board.includes('')) {
            return false;
        }
        
        return true;
    };

    const getBoard = () => [...board];
    const setSquare = (index, mark) => {
        board[index] = mark; 
    };
    const wipeBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    return {getBoard, setSquare, isSquareEmpty, isBoardFull, wipeBoard};
})();

const boardView = (() => {
    const boardDisplay = document.querySelectorAll('.square');
    boardDisplay.forEach(node => node.addEventListener('click', () => {game.takeTurn(node.dataset.index)}));

    const renderBoard = () => {
        const model = boardModel.getBoard();

        for(let index in model) {
            boardDisplay[index].textContent = model[index];
        }
    };

    return {renderBoard}
})();

const boardController = (() => {
    const markBoard = (index, mark) => {
        if(boardModel.isSquareEmpty(index) === true) {
            boardModel.setSquare(index, mark);
            boardView.renderBoard();
        }
    };

    return {markBoard};
})();

const game = (() => {
    // Create both player objects
    const player1 = Player('player1', 'X');
    const player2 = Player('player2', 'O');

    // Set the first turn to player1 by default
    let currentTurn = player1;

    // Freezes the board if a win or tie is reached
    let gameOver = false;

    const switchTurn = () => {
        if(currentTurn === player1) {
            currentTurn = player2;
        }
        else {
            currentTurn = player1;
        }
    };

    const checkTie = () => {
        if(boardModel.isBoardFull() && !checkWin()) {
            return true;
        }
    }

    const checkWin = () => {
        // list out each combination with checkEquivalence
        if(checkEquivalence(0, 1, 2) || checkEquivalence(3, 4, 5) || checkEquivalence (6, 7, 8)
        || checkEquivalence(0, 3, 6) || checkEquivalence(1, 4, 7) || checkEquivalence (2, 5, 8)
        || checkEquivalence(0, 4, 8) || checkEquivalence(2, 4, 6)) 
        { return true; }
    }

    const checkEquivalence = (index1, index2, index3) => {
        const board = boardModel.getBoard();

        // prevents equivalence of empty spaces
        if(board[index1] === '') {
            return false;
        }

        if(board[index1] === board[index2] && board[index2] === board[index3]) {
            console.log(index1, index2, index3);
            return true;
        }

        return false;
    }

    const takeTurn = (index) => {
        // prevents a turn if game is over
        if(gameOver) {
            return;
        }

        boardController.markBoard(index, currentTurn.getMark());
        if(checkWin() || checkTie()) {
            gameOver = true;
        }

        switchTurn();
    }

    const restart = () => {
        boardModel.wipeBoard();
        boardView.renderBoard();
    }

    return {takeTurn, restart};
})();

