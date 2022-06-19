const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const gameBoard = (() => {
    const boardState = ['X', '', 'O', '', 'X', 'X', '', '', ''];

    const getBoardState = () => [...boardState];
    const setBoardState = (index, mark) => {
        boardState[index] = mark; 
    }

    return {getBoardState, setBoardState};
})();

const gameDisplay = (() => {
    const boardDisplay = document.querySelectorAll('.square');

    const renderBoard = () => {
        const boardData = gameBoard.getBoardState();

        for(let index in boardData) {
            boardDisplay[index].textContent = boardData[index];
        }
    };

    return {renderBoard}
})();

const gameController = (() => {

})();

