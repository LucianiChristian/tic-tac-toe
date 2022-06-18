const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const gameBoard = (() => {
    const board = ['X', '', 'O', '', 'X', 'X', '', '', ''];

    return {board};
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

