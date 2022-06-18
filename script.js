const Player = (name, mark) => {
    const getName = () => name;
    const getMark  = () => mark;

    return {getName, getMark};
}

const gameBoard = (() => {
    const board = ['X', '', 'O', '', 'X', 'X', '', '', ''];

    const display = () => board;

    return {display};
})();

const game = (() => {
    
})();