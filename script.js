const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const gameBoard = (() => {
    const boardState = ['X', '', 'O', '', 'X', 'X', '', '', ''];

<<<<<<< HEAD
    const getBoardState = () => [...boardState];
    const setBoardState = (index, mark) => {
        boardState[index] = mark; 
    }

    return {getBoardState, setBoardState};
=======
    return {board};
>>>>>>> b68235f7ff201c4b4f020b0fbf8f98b057db2e84
})();

const gameDisplay = (() => {
    const boardDisplay = document.querySelectorAll('.square');

    const renderBoard = () => {
        for(let index in gameBoard.board) {
            boardDisplay[index].textContent = gameBoard.board[index];
        }
    };

    return {renderBoard}
})();

const gameController = (() => {

})();

