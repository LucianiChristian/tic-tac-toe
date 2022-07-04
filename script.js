const game = {
    controller: (() => {
      const pageTransitions = {
        startToGame: () => {
          game.view.hidePage.start();
          game.view.revealPage.game();        
          
          game.model.gamePage.setPlayer1();
          game.model.gamePage.setPlayer2();
          
          if(game.model.gamePage.getPlayer1Mark() === 'X') {
            game.model.gamePage.setCurrentTurnPlayer1();
          }
          else {
            game.model.gamePage.setCurrentTurnPlayer2();
          }
          
          if(game.model.gamePage.getCurrentTurn().getName() === 'CPU') {
            takeTurnCPU();
          }
          
          game.view.update.turnIndicator();
          game.view.update.scores();
          game.view.update.bottomBarP1Name();
          game.view.update.bottomBarP2Name();
        },
        gameToRoundOver: (result) => {
          game.view.update.winnerMessage(result);
          game.view.revealPage.roundOver();
        },
        gameToStart: () => {
          game.view.hidePage.game();
          game.view.revealPage.start();
          game.view.reset.pickMark();
          game.model.wipe();
          board.controller.wipe();
        },
        roundOverToGame: () => {
          game.view.hidePage.roundOver();
          board.controller.wipe();
          game.view.revealPage.game();

          
          if(game.model.gamePage.getPlayer1Mark() === 'X') {
            game.model.gamePage.setCurrentTurnPlayer1();
          }
          else {
            game.model.gamePage.setCurrentTurnPlayer2();
          }
          
          if(game.model.gamePage.getCurrentTurn().getName() === 'CPU') {
            takeTurnCPU();
          }

          game.view.update.turnIndicator();
        },
        roundOverToStart: () => {
          game.view.hidePage.roundOver();
          game.view.hidePage.game();
          game.view.reset.pickMark();
          game.view.revealPage.start();
          game.model.wipe();
          board.controller.wipe();
        }
      };
      
      const takeTurn = (node) => {
        const result = game.model.gamePage.takeTurn(node.dataset.index);
        
        if(result !== undefined) {
          game.model.gamePage.switchTurn();
          game.controller.pageTransitions.gameToRoundOver(result);
        }
        else if(game.model.gamePage.getCurrentTurn().getName() === 'CPU' && !board.model.isBoardFull()) {
          takeTurnCPU();
        } 
  
        
        game.view.update.turnIndicator();
        game.view.update.scores();
        
     
      };
      
      const takeTurnCP = () => {      
        const boardDisplay = Array.from(document.querySelectorAll('.square'));
        
        const emptyBoardSquares = boardDisplay.filter(square => board.model.isSquareEmpty(square.dataset.index));
        
        const emptyIndices = emptyBoardSquares.map(square => square.dataset.index);
        
        let randomIndex = Math.floor(Math.random() * emptyIndices.length);
  
        takeTurn(emptyBoardSquares[randomIndex]);
      }
      
      const takeTurnCPU = () => {
        setTimeout(takeTurnCP, 200);
      }
      
      return {pageTransitions, takeTurn}
    })(),
    model: (() => {
      const startPage = (() => {
        let player1Mark = 'X';
        let gameMode;
        
        const getPlayer1Mark = () => player1Mark;
        const setPlayer1MarkX = () => {
          player1Mark = 'X';
        };
        const setPlayer1MarkO = () => {
          player1Mark = 'O';
        };
        
        const getGameMode = () => gameMode;
        const setGameModeMultiplayer = () => {
          gameMode = 'Multiplayer';
        };
        const setGameModeCPU = () => {
          gameMode = 'CPU';
        };
        
        const wipe = () => {
          player1Mark = 'X';
          gameMode = null;
        };
        
        return {getPlayer1Mark, setPlayer1MarkX, setPlayer1MarkO, getGameMode, setGameModeMultiplayer, setGameModeCPU, wipe}
      })(); 
      const gamePage = (() => {
        let tieScore = 0;
        let player1Score = 0;
        let player2Score = 0;
        
        let currentTurn;
        
        let player1;
        let player2;
        
        const getTieScore = () => tieScore;
        const setTieScore = (score) => {
          tieScore = score;
        };
        
        const getPlayer1Score = () => player1Score;
        const setPlayer1Score = (score) => {
          player1Score = score;
        };
        
        const getPlayer2Score = () => player2Score;
        const setPlayer2Score = (score) => {
          player2Score = score;
        };
        
        const getCurrentTurn = () => currentTurn;
        const setCurrentTurnPlayer1 = () => {
          currentTurn = player1;
        };
        const setCurrentTurnPlayer2 = () => {
          currentTurn = player2;
        };
        
        const switchTurn = () => {
          if(currentTurn === player1) {
              setCurrentTurnPlayer2();
          }
          else {
              setCurrentTurnPlayer1();
          }
        };
        
        const getPlayer1Mark = () => player1.getMark();
        const getPlayer1Name = () => player1.getName();
        const setPlayer1 = () => {
          player1 = Player();
          player1.setNamePlayer1();
          
          if(game.model.startPage.getPlayer1Mark() === 'X') {
            player1.setMarkAsX();
          }
          else if(game.model.startPage.getPlayer1Mark() === 'O') {
            player1.setMarkAsO();
          }
        };   
        
        const getPlayer2Mark = () => player2.getMark();
        const getPlayer2Name = () => player2.getName();  
        const setPlayer2 = () => {
          player2 = Player();
  
          if(game.model.startPage.getGameMode() === 'Multiplayer') {
            player2.setNamePlayer2();
          }
          else if(game.model.startPage.getGameMode() === 'CPU') {
            player2.setNameCPU();
          }
          
          if(game.model.startPage.getPlayer1Mark() === 'X') {
            player2.setMarkAsO();
          }
          else if(game.model.startPage.getPlayer1Mark() === 'O') {
            player2.setMarkAsX();
          }
        };
        
        const checkTie = () => {
          if(board.model.isBoardFull() && !checkWin()) {
              tieScore++;
              return true;
          }
          else {
            return false;
          }
        }
        
        const checkWin = () => {
          // list out each combination with checkEquivalence
          if(checkEquivalence(0, 1, 2) || checkEquivalence(3, 4, 5) || checkEquivalence (6, 7, 8)
          || checkEquivalence(0, 3, 6) || checkEquivalence(1, 4, 7) || checkEquivalence (2, 5, 8)
          || checkEquivalence(0, 4, 8) || checkEquivalence(2, 4, 6)) 
          { 
            if(currentTurn === player1) {
              player1Score++;
            }
            else if (currentTurn === player2) {
              player2Score++;
            }
            return true; 
          }
          else {
            return false;
          }
      }
        
      const checkEquivalence = (index1, index2, index3) => {
          const boardModel = board.model.getBoard();
  
          // prevents equivalence of empty spaces
          if(boardModel[index1] === '') {
              return false;
          }
  
          if(boardModel[index1] === boardModel[index2] && boardModel[index2] === boardModel[index3]) {
              return true;
          }
  
          return false;
      }
      
      
      const takeTurn = (index) => {
          const successfulMark = board.controller.markBoard(index, currentTurn.getMark());
          
          if(checkWin()) {
            return getCurrentTurn().getName();
          }
        
          if(checkTie()) {
            return 'tie';
          }
          
          if(successfulMark) {
            switchTurn();
          }
      }
        
        const wipe = () => {
          tieScore = 0;
          player1Score = 0;
          player2Score = 0;
          currentTurn = null;
          player1 = null;
          player2 = null;
        };
        
        return {getTieScore, setTieScore, 
                getPlayer1Score, setPlayer1Score, 
                getPlayer2Score, setPlayer2Score,
                getCurrentTurn, setCurrentTurnPlayer1, setCurrentTurnPlayer2, switchTurn,
                getPlayer1Mark, getPlayer1Name, setPlayer1,
                getPlayer2Mark, getPlayer2Name, setPlayer2,
                checkTie, checkWin, checkEquivalence, takeTurn, wipe}
      })();
      
      const wipe = () => {
        startPage.wipe();
        gamePage.wipe();
      };
      return {startPage, gamePage, wipe}
    })(),
    view: (() => {
      const hidePage = {
        start: () => {
          const startDiv = document.getElementById('start-page');
          startDiv.style.display = 'none';
        },
        game: () => {
          const gameDiv = document.getElementById('game-page');
          gameDiv.style.display = 'none';
        },
        roundOver: () => {
          const roundDiv = document.getElementById('round-page');
          roundDiv.style.display = 'none';
        }
      }
      const revealPage = {
        start: () => {
          const startDiv = document.getElementById('start-page');
          startDiv.style.display = 'flex';
        },
        game: () => {
          const gameDiv = document.getElementById('game-page');
          gameDiv.style.display = 'flex';
        },
        roundOver: () => {
          const roundDiv = document.getElementById('round-page');
          roundDiv.style.display = 'flex';
        }
      }
      const update = {
        turnIndicator: () => {
          const indicator = document.querySelector('.turn-indicator');
          indicator.textContent = game.model.gamePage.getCurrentTurn().getName();
        },
        scores: () => {
          const scores = document.querySelectorAll('.bottom-bar > div > .score');
          scores[0].textContent = game.model.gamePage.getPlayer1Score();
          scores[1].textContent = game.model.gamePage.getTieScore();
          scores[2].textContent = game.model.gamePage.getPlayer2Score();
        },
        winnerMessage: (result) => {
          const winnerMessage = document.getElementById('roundOver-winnerMessage');
          if(result === 'tie') {
            winnerMessage.textContent = `It's a tie!`;
          }
          else {
            winnerMessage.textContent = `${result} takes the round`;
          }
        },
        bottomBarP1Name: () => {
          const player1Name = document.getElementById('player1Name');
          
          player1Name.textContent = `${game.model.gamePage.getPlayer1Mark()} (${game.model.gamePage.getPlayer1Name()})`;
        },
        bottomBarP2Name: () => {
          const player2Name = document.getElementById('player2Name');
          
          player2Name.textContent = `${game.model.gamePage.getPlayer2Mark()} (${game.model.gamePage.getPlayer2Name()})`;
        }
      };
      const reset = {
        pickMark: () => {
          const choiceXButton = document.getElementById('setP1Mark-X');
          const choiceOButton = document.getElementById('setP1Mark-O');
          
          choiceXButton.classList.remove('notSelected');
          choiceOButton.classList.add('notSelected');
        }
      }
      return {hidePage, revealPage, update, reset}
    })()
  };
  
  const board = {
    controller: (() => {
      const markBoard = (index, mark) => {
            if(board.model.isSquareEmpty(index) === true) {
                board.model.setSquare(index, mark);
                board.view.renderBoard();
                board.view.renderMarkColors();
                return true;
            }
            
            return false;
        };
      
      const wipe = () => {
          board.model.wipeBoard();
          board.view.renderBoard();
      }
      
      return {markBoard, wipe}; 
    })(),
    model: (() => {
      let boardEntries = ['', '', '', '', '', '', '', '', ''];
  
      const isSquareEmpty = (index) => {
          if(board.model.getBoard()[index] === '') {
              return true;
          }
  
          return false;
      };
  
      const isBoardFull = () => {
          if(boardEntries.includes('')) {
              return false;
          }
          
          return true;
      };
  
      const getBoard = () => [...boardEntries];
      const setSquare = (index, mark) => {
          boardEntries[index] = mark; 
      };
      const wipeBoard = () => {
          boardEntries = ['', '', '', '', '', '', '', '', ''];
      };
  
      return {getBoard, setSquare, isSquareEmpty, isBoardFull, wipeBoard};
    })(),
    view: (() => {
      const boardDisplay = document.querySelectorAll('.square');
      boardDisplay.forEach(node => node.addEventListener('click', () => {
        game.controller.takeTurn(node) 
      }));
  
      const renderBoard = () => {
        const model = board.model.getBoard();
        
        for(let index in model) {
          boardDisplay[index].textContent = model[index];
        }
      };
      
      const renderMarkColors = () => {
        const model = board.model.getBoard();
        
        for(let index in model) {
          if(model[index] === game.model.gamePage.getPlayer1Mark()) {
            boardDisplay[index].style.color = 'var(--bg-color-blue)';
          }
          else {
            boardDisplay[index].style.color = 'var(--bg-color-yellow)';
          }
        }
      }
      
      return {renderBoard, renderMarkColors}
    })()
  };
  
  const Player = () => {
    let mark;
    let name;
    
    const getMark = () => mark;
    const setMarkAsX = () => {
      mark = 'X';
    };
    const setMarkAsO = () => {
      mark = 'O';
    };
    
    const getName = () => name;
    const setNamePlayer1 = () => name = 'Player 1';
    const setNamePlayer2 = () => name = 'Player 2';
    const setNameCPU = () => name = 'CPU';
    
    return {getMark, setMarkAsX, setMarkAsO, getName, setNamePlayer1, setNamePlayer2, setNameCPU};
  };
  
  const eventListeners = {
    startPage: function() {
      const choiceXButton = document.getElementById('setP1Mark-X');
      const choiceOButton = document.getElementById('setP1Mark-O');
      choiceXButton.addEventListener('click', () => {
        game.model.startPage.setPlayer1MarkX();
        choiceXButton.classList.toggle('notSelected');
        choiceOButton.classList.toggle('notSelected');
      });
      choiceOButton.addEventListener('click', () => {
        game.model.startPage.setPlayer1MarkO();
        choiceXButton.classList.toggle('notSelected');
        choiceOButton.classList.toggle('notSelected');
      });
      
      const gameModeMultButton =  document.getElementById('setGameMode-Mult');
      const gameModeCPUButton = document.getElementById('setGameMode-CPU');
      gameModeMultButton.addEventListener('click', () => {
        game.model.startPage.setGameModeMultiplayer();
        game.controller.pageTransitions.startToGame();
      });
      gameModeCPUButton.addEventListener('click', () => {
        game.model.startPage.setGameModeCPU();
        game.controller.pageTransitions.startToGame();
    });
    },
    gamePage: function() {
      const restartGameButton = document.querySelector('.restart-game');
      restartGameButton.addEventListener('click', game.controller.pageTransitions.gameToStart);
    },
    roundOver: function() {
      const nextRoundButton = document.getElementById('roundOver-nextRound'); 
      const quitButton = document.getElementById('roundOver-quit')
      nextRoundButton.addEventListener('click', game.controller.pageTransitions.roundOverToGame);
      quitButton.addEventListener('click', game.controller.pageTransitions.roundOverToStart);
    }
  };
  eventListeners.startPage(); 
  eventListeners.gamePage(); 
  eventListeners.roundOver();