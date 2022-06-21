const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const boardModel = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const isSquareEmpty = (index) => {
        if(boardModel.getBoard()[index] === '') {
            return true;
        }

        return false;
    }

    const getBoard = () => [...board];
    const setSquare = (index, mark) => {
        board[index] = mark; 
    }

    return {getBoard, setSquare, isSquareEmpty};
})();

const boardView = (() => {
    const boardDisplay = document.querySelectorAll('.square');

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

    // Switches turn
    const switchTurn = () => {
        if(currentTurn === player1) {
            currentTurn = player2;
        }
        else {
            currentTurn = player1;
        }
    };

    // Takes a turn
    const takeTurn = () => {
        boardController.markBoard(0, currentTurn.getMark());
        switchTurn();
    }

    return {takeTurn};
})();