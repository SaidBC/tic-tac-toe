const controller = new AbortController();
const mainContainer = document.querySelector('.main-container')
// NEW GAME BTNS
const pickPlayer = document.getElementsByName('player-option')
const newGameVsCpuBtn = document.querySelector('.new-game-vs-cpu-btn')
const newGameVsPlayerBtn = document.querySelector('.new-game-vs-player-btn')
// current game result variables:
const currentGameResultContainer = document.querySelector('.current-game-result-container');
const gameResult = document.querySelector('.game-result');
const gameWinner = document.querySelector('.game-winner');
const quitBtn = document.querySelector('.quit-btn');
const nextRoundBtn = document.querySelector('.next-round-btn');
// last games results variables :
const xPlayer = document.querySelector('.x-player');
const oPlayer = document.querySelector('.o-player');
const ties = document.querySelector('.draws');
// RESTART GAME variables ;
const restartBtn = document.querySelector('.retry-btn');
const restartGameContainer = document.querySelector('.restart-game-container');
const restartBtnYes = document.querySelector('.restart-buttons .yes')
const restartBtnNo = document.querySelector('.restart-buttons .no')
// Launch the game
const headerTurn = document.querySelector('.player-turn .turn')
const gameBoardContainer = document.querySelector('.game-board-section')
const LaunchGame = (yourChoise, mode) => {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let turn = 1;
    let isGameOver = false;
    // PLAYERS
    const playerOne = { name: '', win: 0, }
    const playerTwo = { name: '', win: 0, }
    let gameDraws = 0;
    playerOne.name = mode == '1VS1' ? 'P-1' : mode == 'CPU' && yourChoise == 1 ? 'YOU' : 'CPU';
    playerTwo.name = mode == '1VS1' ? 'P-2' : mode == 'CPU' && yourChoise == 2 ? 'YOU' : 'CPU';
    xPlayer.children[0].textContent = `X (${playerOne.name})`
    oPlayer.children[0].textContent = `O (${playerTwo.name})`
    // Reset Board 
    const resetBoard = () => {
        const blocks = document.querySelectorAll('.block');
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        turn = 1;
        blocks.forEach((b) => {
            b.classList.remove('active')
            b.classList.remove('x-block')
            b.classList.remove('o-block')
        })
        currentGameResultContainer.classList.add('ongoing')
        headerTurn.classList.add('turn-x')
        headerTurn.classList.remove('turn-o')
        gameWinner.classList.remove('x-win')
        gameWinner.classList.remove('o-win')
        gameWinner.classList.remove('draw')
        isGameOver = false;
        if (mode == 'CPU' && yourChoise == 2) {
            setTimeout(() => {
                blocks[[].concat(board[0], board[1], board[2]).indexOf(0, Math.floor(Math.random() * 8))].click()
            }, 200);
        }
        console.log('its me mario')
    }
    nextRoundBtn.onclick = resetBoard

    //  RESTART GAME
    restartBtn.onclick = () => {
        restartGameContainer.classList.remove('hide')
        console.log('its me mario from reset')
    }
    restartBtnNo.onclick = () => {
        restartGameContainer.classList.add('hide')
    }
    restartBtnYes.onclick = () => {
        const blocks = document.querySelectorAll('.block');
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        turn = 1;
        playerOne.win = 0;
        playerTwo.win = 0;
        gameDraws = 0;
        blocks.forEach((b) => {
            b.classList.remove('active')
            b.classList.remove('x-block')
            b.classList.remove('o-block')
        })
        headerTurn.classList.add('turn-x')
        headerTurn.classList.remove('turn-o')
        restartGameContainer.classList.add('hide')
        xPlayer.children[1].textContent = playerOne.win;
        oPlayer.children[1].textContent = playerTwo.win;
        ties.children[1].textContent = gameDraws;
        isGameOver = false;
        if (mode == 'CPU' && yourChoise == 2) {
            setTimeout(() => {
                blocks[[].concat(board[0], board[1], board[2]).indexOf(0, Math.floor(Math.random() * 8))].click()
            }, 200);
        }
    }

    // QUIT GAME 
    quitBtn.addEventListener('click', () => {
        mainContainer.classList.remove('playing')
        resetBoard()
        playerOne.name = '';
        playerTwo.name = '';
        playerOne.win = 0;
        playerTwo.win = 0;
        gameDraws = 0;
        headerTurn.classList.add('turn-x')
        headerTurn.classList.remove('turn-o')
        xPlayer.children[1].textContent = playerOne.win;
        oPlayer.children[1].textContent = playerTwo.win;
        ties.children[1].textContent = gameDraws;
        isGameOver = false;

    })
    // GAME
    const playingBlock = (e) => {
        const blocks = document.querySelectorAll('.block');
        const isPlayed = e.target.classList.value.includes('active');
        if (!isPlayed && !isGameOver) {
            // header turn toggle 
            headerTurn.classList.toggle('turn-x')
            headerTurn.classList.toggle('turn-o')
            // game rules 
            const ticTacToeGame = (board) => {
                let whoIsWinner = 0;
                for (let x = 0; x < board.length; x++) {
                    let verticalBoardArr = [];
                    for (let y = 0; y < board.length; y++) {
                        verticalBoardArr.push(board[y][x]);
                    }
                    if (!board[x].includes(1) && !board[x].includes(0)) {
                        whoIsWinner = 2;
                    } else if (!board[x].includes(2) && !board[x].includes(0)) {
                        whoIsWinner = 1;
                    } else if (!verticalBoardArr.includes(1) && !verticalBoardArr.includes(0)) {
                        whoIsWinner = 2;
                    } else if (!verticalBoardArr.includes(2) && !verticalBoardArr.includes(0)) {
                        whoIsWinner = 1;
                    }
                }
                if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1) {
                    whoIsWinner = 1;
                } else if (board[0][0] == 2 && board[1][1] == 2 && board[2][2] == 2) {
                    whoIsWinner = 2;
                } else if (board[0][2] == 1 && board[1][1] == 1 && board[2][0] == 1) {
                    whoIsWinner = 1;
                } else if (board[0][2] == 2 && board[1][1] == 2 && board[2][0] == 2) {
                    whoIsWinner = 2;
                } else if (
                    [].concat(board[0], board[1], board[2]).indexOf(0) == -1 &&
                    whoIsWinner == 0
                ) {
                    whoIsWinner = 3;
                }
                return whoIsWinner;
            };
            // End Game rules
            const blockIndex = e.target.getAttribute('data-index');
            if (blockIndex <= 2) {
                board[0][blockIndex] = turn;
            } else if (blockIndex > 2 && blockIndex <= 5) {
                board[1][blockIndex - 3] = turn;
            } else {
                board[2][blockIndex - 6] = turn;
            }

            // SHOW RESULTS
            switch (ticTacToeGame(board)) {
                case 1:
                    currentGameResultContainer.classList.remove('ongoing')
                    if (mode == 'CPU') {
                        gameResult.textContent = `${playerOne.name == 'YOU' ? 'YOU WON!' : 'YOU LOSE!'}`
                    } else if (mode == '1VS1') {
                        gameResult.textContent = `${yourChoise == 1 ? 'YOU WON!' : 'P-1 WON!'}`
                    }
                    gameWinner.classList.add('x-win')
                    xPlayer.children[1].textContent = ++playerOne.win;
                    quitBtn.addEventListener('click', () => {
                        blocks.forEach((b) => {
                            b.removeEventListener('click', playingBlock)
                        })
                    })
                    isGameOver = true;
                    break;
                case 2:
                    currentGameResultContainer.classList.remove('ongoing')
                    if (mode == 'CPU') {
                        gameResult.textContent = `${playerTwo.name == 'YOU' ? 'YOU WON!' : 'YOU LOSE!'}`
                    } else if (mode == '1VS1') {
                        gameResult.textContent = `${yourChoise == 2 ? 'YOU WON!' : 'P-2 WON!'}`

                    }
                    gameWinner.classList.add('o-win');
                    oPlayer.children[1].textContent = ++playerTwo.win;
                    isGameOver = true;
                    break;
                case 3:
                    currentGameResultContainer.classList.remove('ongoing')
                    gameResult.textContent = 'IT\'S A DRAW!'
                    gameWinner.classList.add('draw');
                    ties.children[1].textContent = ++gameDraws;
                    quitBtn.addEventListener('click', () => {
                        blocks.forEach((b) => {
                            b.removeEventListener('click', playingBlock)
                        })
                    })
                    isGameOver = true;
                    break;

                default:
                    break;
            }

            // Change turns
            if (turn == 1) {
                e.target.classList.add('x-block')
                turn = 2;
            } else {
                e.target.classList.add('o-block')
                turn = 1;
            }
            e.target.classList.add('active');

            // CPU 
            if (mode == 'CPU' && turn == (yourChoise == 1 ? 2 : 1)) {
                setTimeout(() => {
                    blocks[[].concat(board[0], board[1], board[2]).indexOf(0, Math.floor(Math.random() * 8))].click()
                }, 200);
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        const block = document.createElement('button');
        block.classList.add("block");
        block.setAttribute('data-index', i)
        block.addEventListener('click', playingBlock)
        gameBoardContainer.append(block)
    }
    // CPU FIRST PLAYER 
    const blocks = document.querySelectorAll('.block');
    if (mode == 'CPU' && yourChoise == 2) {
        setTimeout(() => {
            blocks[[].concat(board[0], board[1], board[2]).indexOf(0, Math.floor(Math.random() * 8))].click()
        }, 200);
    }

}
const handleNewGameVsCPU = () => {
    if (pickPlayer[0].checked || pickPlayer[1].checked) {
        gameBoardContainer.innerHTML = '';
        mainContainer.classList.add('playing');
        LaunchGame(pickPlayer[0].checked ? 1 : 2, 'CPU')
    }
}
const handleNewGameVsPlayer = () => {
    if (pickPlayer[0].checked || pickPlayer[1].checked) {
        mainContainer.classList.add('playing')
        gameBoardContainer.innerHTML = '';
        LaunchGame(pickPlayer[0].checked ? 1 : 2, '1VS1')
    }
}
newGameVsCpuBtn.addEventListener('click', handleNewGameVsCPU)
newGameVsPlayerBtn.addEventListener('click', handleNewGameVsPlayer)