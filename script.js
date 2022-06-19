const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const boardModel = (() => {
    const board = ['X', '', 'O', '', 'X', 'X', '', '', ''];

    const getBoard = () => [...board];
    const setSquare = (index, mark) => {
        board[index] = mark; 
    }

    return {getBoard, setSquare};
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
    // mark board
        // gameBoard.setBoardState()
        // gameDisplay.renderBoard()
})();

