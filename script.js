const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const gameBoard = (() => {
    const board = ['X', '', 'O', '', 'X', 'X', '', '', ''];

    const getBoard = () => board;

    return {getBoard};
})();

const gameDisplay = (() => {
    const boardDisplay = document.querySelectorAll('.square');

    const renderBoard = () => {
        const boardData = gameBoard.getBoard();

        for(let index in boardData) {
            boardDisplay[index].textContent = boardData[index];
        }
    };

    return {renderBoard}
})();

const gameController = (() => {

})();

